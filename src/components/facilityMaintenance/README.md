# Facility Maintenance Module Error Handling

This document outlines the error handling strategy implemented in the Facility Maintenance module to ensure application stability and provide a better user experience.

## Components

### ErrorBoundary

A class component that catches JavaScript errors in its child component tree and displays a fallback UI instead of crashing the entire application.

```jsx
<ErrorBoundary moduleName="Asset Management">
  <AssetManagement />
</ErrorBoundary>
```

### LoadingFallback

A component that displays a loading indicator with a customizable message.

```jsx
<Suspense fallback={<LoadingFallback message="Loading assets..." />}>
  <AssetManagement />
</Suspense>
```

### ApiErrorHandler

Utility functions for handling API errors consistently across the application.

```javascript
const { data, error } = await withErrorHandling(fetchData)();
if (error) {
  // Handle error
}
```

### GlobalErrorHandler

A component that catches unhandled promise rejections and global errors.

```jsx
<GlobalErrorHandler>
  <App />
</GlobalErrorHandler>
```

### WithDataFetching

A higher-order component that handles data fetching, loading states, and error handling.

```jsx
<WithDataFetching
  fetchData={fetchAssets}
  loadingMessage="Loading assets..."
  renderData={(data) => <AssetList assets={data} />}
/>
```

### ErrorFallbacks

A collection of pre-designed error fallback components for different error scenarios.

```jsx
<GenericErrorFallback error="Failed to load data" onRetry={fetchData} />
<NetworkErrorFallback onRetry={fetchData} />
<ServerErrorFallback onRetry={fetchData} />
<DataNotFoundFallback onRetry={goBack} />
```

### withErrorHandling

A higher-order component that adds error handling to any component.

```jsx
const SafeAssetManagement = withErrorHandling(AssetManagement);
```

### SafeRender

A component that safely renders its children, catching any errors and displaying a fallback UI.

```jsx
<SafeRender fallback={<ErrorFallback />}>
  <RiskyComponent />
</SafeRender>
```

### enhancedFacilityMaintenanceService

An enhanced version of the facility maintenance service with built-in error handling.

```javascript
const { data, error } = await enhancedFacilityMaintenanceService.getAssets();
```

## Implementation Strategy

1. **Component Level**: Use ErrorBoundary and SafeRender to catch errors in component rendering.
2. **Data Fetching**: Use WithDataFetching or withErrorHandling HOC for data fetching operations.
3. **API Calls**: Use enhancedFacilityMaintenanceService or ApiErrorHandler utilities for API calls.
4. **Global Errors**: Use GlobalErrorHandler to catch unhandled errors.
5. **Loading States**: Use Suspense with LoadingFallback for asynchronous operations.

## Best Practices

1. Always wrap components that might throw errors in ErrorBoundary.
2. Use try/catch blocks for async operations.
3. Provide meaningful error messages to users.
4. Log errors to the console and potentially to an error monitoring service.
5. Offer retry functionality when appropriate.
6. Use lazy loading with Suspense to improve performance and handle loading states.
