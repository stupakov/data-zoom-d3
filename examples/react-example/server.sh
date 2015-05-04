#!/usr/bin/env bash
sass --watch ../../sass:public/stylesheets sass:public/stylesheets &
ruby -run -e httpd . -p5001
