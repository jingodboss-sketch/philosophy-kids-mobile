@echo off
chcp 65001 >nul
echo ========================================
echo   小小哲学家 APK 自动构建脚本
echo ========================================
echo.

set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "PATH=%JAVA_HOME%\bin;%PATH%"
set "PROJECT_DIR=D:\BaiduNetdiskWorkspace\trae\philosophy-kids-mobile\android"

cd /d "%PROJECT_DIR%"

echo [1/5] 停止 Gradle 守护进程...
call gradlew.bat --stop >nul 2>&1
timeout /t 3 /nobreak >nul

echo [2/5] 清理构建产物...
if exist .gradle rmdir /s /q .gradle
if exist app\build rmdir /s /q app\build
if exist build rmdir /s /q build
if exist capacitor-android\build rmdir /s /q capacitor-android\build
if exist capacitor-cordova-android-plugins\build rmdir /s /q capacitor-cordova-android-plugins\build

echo [3/5] 预创建 stableIds 文件...
mkdir "app\build\intermediates\stable_resource_ids_file\debug\processDebugResources" 2>nul
copy nul "app\build\intermediates\stable_resource_ids_file\debug\processDebugResources\stableIds.txt" >nul

echo [4/5] 开始构建 (Gradle 8.10.2 + AGP 8.7.3 + JDK 21)...
echo.
call gradlew.bat assembleDebug --no-daemon --rerun-tasks

echo.
echo [5/5] 检查结果...
if exist app\build\outputs\apk\debug\app-debug.apk (
    echo.
    echo ========================================
    echo   构建成功！
    echo   APK: app\build\outputs\apk\debug\app-debug.apk
    echo ========================================
    
    REM 复制到项目根目录
    copy "app\build\outputs\apk\debug\app-debug.apk" "..\philosophy-kids.apk" >nul
    echo   已复制到: philosophy-kids.apk
    echo ========================================
) else (
    echo.
    echo 构建失败。请检查上方错误信息。
    echo.
    echo 提示：如果遇到 stableIds.txt 错误，请重新运行此脚本。
    echo 提示：如果遇到 mergeDebugAssets 错误，请关闭 Android Studio 后重试。
)

echo.
pause
