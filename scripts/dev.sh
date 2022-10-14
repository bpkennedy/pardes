#!/bin/bash

yarn concurrently --kill-others-on-fail \
    "yarn build" \
    "yarn nodemon --watch 'packages/**' --ext 'ts,vue,json' --ignore 'packages/**/node_modules,packages/**/dist' --exec 'yarn build && yarn serve'" \
