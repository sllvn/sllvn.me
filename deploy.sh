#!/bin/sh

gatsby build
aws s3 sync public/ s3://andrewsullivan.us --profile personal --delete 
