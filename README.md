# Flutter Riverpod State Management App

A Flutter application demonstrating proper state management using Riverpod v2 and Freezed for immutable data classes.

## Architecture Overview

This app follows a clean architecture pattern with the following structure:

### 📁 Project Structure

```
lib/
├── models/
│   └── jenis_data.dart          # Data model with Freezed
├── states/
│   └── nama_state.dart          # State classes with Freezed unions
├── notifiers/
│   └── nama_notifier.dart       # Business logic and state management
├── providers/
│   └── nama_provider.dart       # Riverpod providers
├── widgets/
│   └── nama_widget.dart         # UI components
└── main.dart                    # App entry point
```

### 🏗️ State Management Components

#### 1. **NamaState** (State Class)
- `initial`: Default state when the app starts
- `loading`: State during data fetching
- `success`: State with fetched data of type `List<JenisData>`
- `error`: State with error message

#### 2. **NamaNotifier** (Business Logic)
- Extends `Notifier<NamaState>`
- Contains `fetchData()` method that handles state transitions
- Includes `reset()` method to return to initial state
- Generates dummy data for demonstration

#### 3. **namaProvider** (Provider)
- `NotifierProvider<NamaNotifier, NamaState>`
- Provides access to the notifier and state throughout the app

#### 4. **NamaWidget** (UI Component)
- Uses `ConsumerWidget` for Riverpod integration
- Watches state changes with `ref.watch(namaProvider)`
- Displays different UI based on current state using `.when()`

## 🚀 Getting Started

### Prerequisites
- Flutter SDK (>=3.0.0)
- Dart SDK

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flutter_riverpod_app
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Generate code with build_runner**
   ```bash
   flutter packages pub run build_runner build
   ```

4. **Run the app**
   ```bash
   flutter run
   ```

## 🔧 Key Features

### State Transitions
The app demonstrates proper state management with these transitions:
- `initial` → `loading` → `success` (with data)
- `initial` → `loading` → `error` (on failure)

### Best Practices Implemented

1. **Immutable State**: Using Freezed for immutable state classes
2. **Type Safety**: Strong typing with sealed unions for state
3. **Separation of Concerns**: Clear separation between UI, business logic, and state
4. **Error Handling**: Proper error state management
5. **Code Generation**: Leveraging Freezed and JSON serialization
6. **Clean Architecture**: Organized folder structure

### Usage Example

```dart
class MyWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Watch the state
    final namaState = ref.watch(namaProvider);
    
    return namaState.when(
      initial: () => Text('Ready to load data'),
      loading: () => CircularProgressIndicator(),
      success: (data) => ListView.builder(
        itemCount: data.length,
        itemBuilder: (context, index) => ListTile(
          title: Text(data[index].name),
        ),
      ),
      error: (message) => Text('Error: $message'),
    );
  }
}

// Trigger state changes
ref.read(namaProvider.notifier).fetchData(); // Fetch data
ref.read(namaProvider.notifier).reset();     // Reset to initial
```

## 📦 Dependencies

- **flutter_riverpod**: State management
- **freezed**: Code generation for immutable classes
- **json_annotation**: JSON serialization annotations
- **build_runner**: Code generation runner

## 🎯 Learning Objectives

This project demonstrates:
- How to structure a Flutter app with Riverpod v2
- Proper use of Freezed for immutable data classes
- State management best practices
- Clean architecture principles
- Error handling in state management
- UI reactivity with state changes

## 🔄 State Flow Diagram

```
Initial State
     ↓
   fetchData()
     ↓
Loading State
     ↓
  Success/Error
     ↓
Display Result
```

## 🧪 Testing the App

1. **Initial State**: App starts with initial state
2. **Loading State**: Tap "Fetch Data" to see loading indicator
3. **Success State**: After 2 seconds, see the list of dummy data
4. **Reset**: Tap "Reset" to return to initial state
5. **Error State**: Uncomment error simulation in `fetchData()` to test error handling

## 📝 Notes

- The app uses dummy data for demonstration purposes
- Error simulation is commented out but can be enabled for testing
- All state transitions are properly handled with appropriate UI feedback
- The code follows Flutter and Dart best practices