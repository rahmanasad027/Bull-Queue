@echo off
setlocal enabledelayedexpansion

:: Build the NestJS project
nest build

:: Revert migrations in a loop
:revert
typeorm migration:revert -d dist/ormconfig.js --transaction
if errorlevel 1 (
  echo No more migrations to revert.
  goto end
)
goto revert

:end
