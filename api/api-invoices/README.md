# api-invoices

## GET /api/invoices
**input**

`empty`

**output**

```json
[
  {
    "client": {
      "name": "Draft 1",
      "city": "44000 City",
      "address": "10 adresse",
      "timeToPay": "10"
    },
    "dates": {
      "end": 1518217200000,
      "print": 1520775051825
    },
    "lines": [
      {
        "title": "First line",
        "nb": "10",
        "pricePerUnit": "500"
      },
      {
        "title": "Seconde line",
        "nb": "2",
        "pricePerUnit": "100"
      }
    ],
    "id": "draft-1",
    "timetable": [
      {
        "date": "2018-01-10",
        "price": "5000"
      },
      {
        "date": "2018-02-10",
        "price": "1240"
      }
    ],
    "fileId": "10hE_BtUftN9NP_Nr_vxHpIGHF-KHFIVd",
    "ranges": [
      7,
      8
    ]
  }
]
```

## DELETE /api/invoices
**input**

```json
{
  "id": "<id>",
  "ranges": ["<sheet ranges>"],
  "fileId": "google file id",
}
```

**output**
 - 200
 - 400: not a draft invoice

## POST /api/invoices
**input**

```json
{
  "client": {
    "name": "Draft 1",
    "city": "44000 City",
    "address": "10 adresse",
    "timeToPay": "10"
  },
  "dates": {
    "end": 1518217200000,
    "print": 1520775051825
  },
  "lines": [
    {
      "title": "First line",
      "nb": "10",
      "pricePerUnit": "500"
    },
    {
      "title": "Seconde line",
      "nb": "2",
      "pricePerUnit": "100"
    }
  ],
  "id": "draft-1",
  "timetable": [
    {
      "date": "2018-01-10",
      "price": "5000"
    },
    {
      "date": "2018-02-10",
      "price": "1240"
    }
  ]
}
```

**output**
 - 200

## GET /api/lastid
**input**

`empty`

**output**

`<id>`
