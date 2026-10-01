## Purpose

Provides reusable utilities to ping the backend `/warmup` endpoint and prevent cold starts.

## ADDED Requirements

### Requirement: Centralized request body construction

The system SHALL provide a shared function `createWarmupRequestBody()` that constructs the warmup request body with the services list.

#### Scenario: Body construction returns correct format
- **WHEN** `createWarmupRequestBody()` is called
- **THEN** the function SHALL return an object with structure `{ services: [] }`
- **AND** the services array SHALL contain the list of services to warm up

#### Scenario: Single source of truth for body format
- **WHEN** any warmup utility needs to make a request
- **THEN** it SHALL use `createWarmupRequestBody()` to construct the body
- **AND** no caller SHALL construct the body format independently

### Requirement: Server-side warmup function

The system SHALL provide a server action `pingBackend()` that calls the `/warmup` endpoint using the authenticated backend client.

#### Scenario: Server action calls warmup endpoint
- **WHEN** `pingBackend()` is invoked from a server component or server action
- **THEN** the function SHALL make a POST request to `/warmup` via `backendClient`
- **AND** the request SHALL include the body from `createWarmupRequestBody()`
- **AND** the request SHALL include authentication headers when required

#### Scenario: Server action handles warmup response
- **WHEN** the backend responds successfully to the warmup request
- **THEN** `pingBackend()` SHALL return without error
- **AND** when the backend fails to respond, the function SHALL throw an error

### Requirement: Client-side warmup utility

The system SHALL provide a client-side function `pingBackendClient()` that directly fetches the `/warmup` endpoint from the browser.

#### Scenario: Client utility calls warmup endpoint
- **WHEN** `pingBackendClient()` is invoked from client-side code
- **THEN** the function SHALL make a POST request to `/warmup` using the fetch API
- **AND** the request SHALL include the body from `createWarmupRequestBody()`
- **AND** the request SHALL include the WEDDING_BACKEND base URL

#### Scenario: Client utility handles response
- **WHEN** the warmup endpoint responds
- **THEN** `pingBackendClient()` SHALL resolve the Promise
- **AND** when the request fails, the function SHALL reject with an error

### Requirement: React hook for warmup

The system SHALL provide a React hook `usePingBackend()` that wraps the client-side warmup utility with state management.

#### Scenario: Hook provides ping function
- **WHEN** a component calls `usePingBackend()`
- **THEN** the hook SHALL return a `ping` function that invokes `pingBackendClient()`
- **AND** the hook SHALL return `loading` state indicating whether a ping is in progress
- **AND** the hook SHALL return `error` state containing any error from the last ping attempt

#### Scenario: Hook tracks loading state
- **WHEN** the `ping` function is called
- **THEN** `loading` SHALL be `true` while the request is in flight
- **AND** `loading` SHALL be `false` when the request completes or fails

#### Scenario: Hook captures errors
- **WHEN** `pingBackendClient()` rejects
- **THEN** the hook SHALL set `error` to the error object
- **AND** when a subsequent ping succeeds, the hook SHALL clear the error state

### Requirement: Consistent endpoint targeting

All warmup utilities SHALL target the same `/warmup` endpoint path with the same request format.

#### Scenario: Same endpoint and method across utilities
- **WHEN** any warmup utility is invoked
- **THEN** each SHALL make a POST request to `/api/v1/warmup` on the WEDDING_BACKEND
- **AND** each SHALL use `createWarmupRequestBody()` to construct the request body
- **AND** the endpoint path and body format SHALL be consistent across server action, client utility, and hook
