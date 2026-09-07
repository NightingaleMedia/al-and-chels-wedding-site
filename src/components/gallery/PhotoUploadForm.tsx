'use client'

/**
 * Photo and video upload form component
 * Handles multi-file selection, validation, and direct upload to Cloudinary
 */

import React, { useState, ChangeEvent, FormEvent } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
} from '@mui/material'
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
} from '@/types/media'
import { generateUploadSignature } from '@/serverActions/photos/generateUploadSignature'

interface SelectedFile {
  file: File
  id: string
}

interface UploadProgress {
  [fileId: string]: number
}

// Dedicated component so react-toastify's injected closeToast/toastProps/isPaused
// props aren't spread onto the underlying DOM elements.
function UploadProgressToast({
  fileName,
  progress,
}: {
  fileName: string
  progress: number
}) {
  return (
    <Box>
      <Typography variant="body2">Uploading {fileName}...</Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ mt: 1 }} />
    </Box>
  )
}

export default function PhotoUploadForm() {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
  const [caption, setCaption] = useState('')
  const [submitterName, setSubmitterName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({})

  // Validate file type and size
  function validateFile(file: File): { valid: boolean; error?: string } {
    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type)
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type)

    if (!isImage && !isVideo) {
      return {
        valid: false,
        error:
          'Invalid file type. Please upload images (JPG, PNG, GIF, HEIC, WebP) or videos (MP4, MOV, AVI).',
      }
    }

    const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE
    const maxSizeMB = isImage ? 20 : 100

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File too large. Max ${maxSizeMB}MB for ${isImage ? 'images' : 'videos'}.`,
      }
    }

    return { valid: true }
  }

  // Handle file selection
  function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files) return

    const newFiles: SelectedFile[] = []
    const errors: string[] = []

    Array.from(files).forEach((file) => {
      const validation = validateFile(file)
      if (validation.valid) {
        newFiles.push({
          file,
          id: `${file.name}-${Date.now()}-${Math.random()}`,
        })
      } else if (validation.error) {
        errors.push(`${file.name}: ${validation.error}`)
      }
    })

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error))
    }

    setSelectedFiles((prev) => [...prev, ...newFiles])
    // Reset input to allow selecting the same file again
    event.target.value = ''
  }

  // Remove file from selection
  function handleRemoveFile(fileId: string) {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  // Format file size for display
  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  // Upload handler
  async function handleUpload(event: FormEvent) {
    event.preventDefault()

    if (selectedFiles.length === 0) {
      toast.error('Please select at least one file to upload')
      return
    }

    if (!submitterName.trim()) {
      toast.error('Please enter your name')
      return
    }

    setIsUploading(true)

    try {
      // Add metadata (must match exactly what was signed)
      const contextData = `caption=${caption || ''}|submitter=${submitterName}`
      const tagsData = 'wedding-photos,pending'

      // Generate upload signature from server
      const uploadParams = await generateUploadSignature(contextData, tagsData)

      // Upload each file
      const uploadPromises = selectedFiles.map(async (selectedFile) => {
        const { file, id } = selectedFile

        try {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('signature', uploadParams.signature)
          formData.append('timestamp', uploadParams.timestamp.toString())
          formData.append('api_key', uploadParams.apiKey)
          formData.append('upload_preset', uploadParams.uploadPreset)
          formData.append('context', contextData)
          formData.append('tags', tagsData)

          // Upload to Cloudinary with progress tracking
          const xhr = new XMLHttpRequest()

          const uploadPromise = new Promise((resolve, reject) => {
            xhr.upload.addEventListener('progress', (e) => {
              if (e.lengthComputable) {
                const progress = Math.round((e.loaded / e.total) * 100)
                setUploadProgress((prev) => ({ ...prev, [id]: progress }))
              }
            })

            xhr.addEventListener('load', () => {
              if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText))
              } else {
                reject(new Error(`Upload failed: ${xhr.statusText}`))
              }
            })

            xhr.addEventListener('error', () => {
              reject(new Error('Network error during upload'))
            })

            xhr.addEventListener('timeout', () => {
              reject(new Error('Upload timed out'))
            })
          })

          xhr.open(
            'POST',
            `https://api.cloudinary.com/v1_1/${uploadParams.cloudName}/upload`,
          )
          xhr.send(formData)

          // Show progress toast
          const toastId = toast.info(
            <UploadProgressToast
              fileName={file.name}
              progress={uploadProgress[id] || 0}
            />,
            { autoClose: false },
          )

          await uploadPromise

          // Update toast to success
          toast.dismiss(toastId)
          toast.success(`${file.name} uploaded successfully!`)
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error)
          toast.error(`Failed to upload ${file.name}. Please try again.`)
          throw error
        }
      })

      // Wait for all uploads to complete
      const results = await Promise.allSettled(uploadPromises)
      const successCount = results.filter(
        (r) => r.status === 'fulfilled',
      ).length
      const failCount = results.filter((r) => r.status === 'rejected').length

      if (successCount > 0) {
        toast.success(
          `${successCount} file${successCount > 1 ? 's' : ''} uploaded! They'll appear after moderation.`,
        )

        // Clear form on success
        setSelectedFiles([])
        setCaption('')
        setSubmitterName('')
        setUploadProgress({})
      }

      if (failCount > 0) {
        toast.warning(
          `${failCount} file${failCount > 1 ? 's' : ''} failed to upload.`,
        )
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Upload failed. Please try again later.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Paper elevation={0} variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Share Your Photos & Videos
        </Typography>

        <Box component="form" onSubmit={handleUpload} sx={{ mt: 2 }}>
          {/* File input */}
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadIcon />}
            fullWidth
            sx={{ mb: 2 }}
            disabled={isUploading}
          >
            Select Photos/Videos
            <input
              type="file"
              hidden
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
            />
          </Button>

          {/* Selected files list */}
          {selectedFiles.length > 0 && (
            <List sx={{ mb: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              {selectedFiles.map((selectedFile) => (
                <ListItem
                  key={selectedFile.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveFile(selectedFile.id)}
                      disabled={isUploading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={selectedFile.file.name}
                    secondary={formatFileSize(selectedFile.file.size)}
                  />
                </ListItem>
              ))}
            </List>
          )}

          {/* Caption field */}
          <TextField
            label="Caption (optional)"
            multiline
            rows={2}
            fullWidth
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            disabled={isUploading}
            sx={{ mb: 2 }}
            placeholder="Add a caption to your photos..."
          />

          {/* Submitter name field */}
          <TextField
            label="Your Name"
            fullWidth
            required
            value={submitterName}
            onChange={(e) => setSubmitterName(e.target.value)}
            disabled={isUploading}
            sx={{ mb: 2 }}
            placeholder="e.g., John Doe"
          />

          {/* Upload button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isUploading || selectedFiles.length === 0}
            startIcon={<UploadIcon />}
          >
            {isUploading
              ? 'Uploading...'
              : `Upload ${selectedFiles.length} file${selectedFiles.length !== 1 ? 's' : ''}`}
          </Button>
        </Box>
      </Paper>
    </>
  )
}
