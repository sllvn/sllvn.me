---
date: "2016-03-25T12:26:12"
title: "Combining iOS SMS message histories from multiple devices"
---

A couple months back, I gave up on my iPhone 6 (too unwieldy) and began using my old iPhone 5s. Regrettably, I didn’t restore the 5s from a backup, so its SMS history began as a clean slate. Two months later, in preparation for the timely iPhone SE release, I find myself wanting to merge the two SMS histories. Unfortunately, no such way existed, officially or otherwise... until now.

With some Ruby/SQLite hackery, I managed to create [ios-sms-merge](https://github.com/licyeus/ios-sms-merge) - you’ll need to download the kludgy iBackupBot to import/export from your iOS backups, but with persistence and this script, you can now combine your SMS histories.
