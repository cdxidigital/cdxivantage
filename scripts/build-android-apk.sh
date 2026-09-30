#!/bin/sh
set -eu
cd /workspace
export JAVA_HOME="${JAVA_HOME:-/usr/lib/jvm/java-17-openjdk-amd64}"
export ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-/workspace/.android-sdk}"
export ANDROID_HOME="$ANDROID_SDK_ROOT"
export GRADLE_USER_HOME="${GRADLE_USER_HOME:-/workspace/.gradle-home}"
mkdir -p "$GRADLE_USER_HOME"

if [ ! -x /workspace/.gradle-dist/gradle-8.7/bin/gradle ]; then
  echo "Gradle 8.7 is not installed at /workspace/.gradle-dist" >&2
  exit 1
fi
if [ ! -d "$ANDROID_SDK_ROOT/platforms/android-34" ]; then
  echo "Android SDK platform 34 is missing" >&2
  exit 1
fi

/workspace/.gradle-dist/gradle-8.7/bin/gradle \
  -p /workspace/android-app \
  --no-daemon \
  assembleDebug

APK=/workspace/android-app/app/build/outputs/apk/debug/app-debug.apk
cp -f "$APK" /workspace/public/cdxi-vantage.apk
# Also keep a named copy next to the project for sideload scripts.
cp -f "$APK" /workspace/android-app/cdxi-vantage.apk
ls -lh /workspace/public/cdxi-vantage.apk
