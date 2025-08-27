[33m7df5945[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmaster[m[33m, [m[1;31morigin/master[m[33m, [m[1;31morigin/HEAD[m[33m)[m fix: make timer version pill more visible and add debug info
[33m21636cb[m docs: add automated versioning system documentation
[33m3844f1d[m v1.1.2: 2025-08-26 10:07:45 - Automated release
[33m1620fd6[m feat: implement super-precise timer with service worker background operation - Replace setInterval with microsecond precision using performance.now() - Add service worker timer for background operation - Maintain all original gong sounds and audio functionality - Fix timer drift issues for accurate 8-minute countdown - Add background notifications and visibility change handling
[33mad4a2a6[m Rollback to commit 1214e1a - revert Android timer fixes and restore previous audio focus management
