#!/bin/sh

docker build -t expenses --build-arg app=expenses . --rm=true
docker build -t invoices --build-arg app=invoices . --rm=true