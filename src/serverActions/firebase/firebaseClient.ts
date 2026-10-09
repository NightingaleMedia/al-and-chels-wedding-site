import { initializeApp, getApps, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { Story } from './firebase.schemas'
import dayjs from 'dayjs'
class FirebaseClient {
  private app: App
  private db: Firestore

  constructor() {
    if (getApps().length === 0) {
      this.app = initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID,
      })
    } else {
      this.app = getApps()[0]
    }

    this.db = getFirestore(
      this.app,
      process.env.FIREBASE_DATABASE_ID || '(default)',
    )
  }

  private async create<T extends FirebaseFirestore.DocumentData>(
    collectionName: string,
    data: T,
  ): Promise<string> {
    const docRef = await this.db.collection(collectionName).add(data)
    return docRef.id
  }

  private async read<T>(collectionName: string): Promise<T[]> {
    const snapshot = await this.db
      .collection(collectionName)
      .orderBy('createdAt', 'desc')
      .get()

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[]
  }

  public async addStory(storyMessage: string, author: string): Promise<string> {
    const story: Omit<Story, 'id'> = {
      storyMessage,
      author,
      createdAt: dayjs().toISOString(),
    }
    return this.create('stories', story)
  }

  public async getStories(): Promise<Story[]> {
    return this.read<Story>('stories')
  }
}

export const firebaseClient = new FirebaseClient()
