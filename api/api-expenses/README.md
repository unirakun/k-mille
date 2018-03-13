# api-expenses

## `GET /api/auth/google/callback?code=` - returns tokens and profile informations
**request**

`empty`

**response**
```js
{
  tokens: { // from google
    access_token: '<access_token>',
    expiry_date: '<expiry_date>',
    id_token: '<id_token>',
    token_type: '<token_type>',
  },
  name: '<user name>',
  avatar: '<url to avatar>',
  id: '<profile id>', // debug purpose
}
```

## `GET /api/auth` - redirect to google login

## `POST /api/images` - upload an expense image and runs OCR scan
**request**
```js
{
  image: '<base64 image>',
  user: '<user name>',
}
```

**response**
```js
{
  fileId: '<google drive\'s id>',
  prices: [/* 3 best matches */],
}
```

## `DELETE /api/images/<url>` - remove an image from server
**request**

`empty`

**response**

`empty`

## `POST /api/expenses` - create a new expense
**request**
```js
{
  client: '<lient name>',
  vat: '<vat>', // percent (example 20%, 10%, 0%)
  price: '<price>', // price with all taxes
  fileId: '<google drive\'s id>',
  user: '<user name>', // fabien
}
```

**response**

`empty`

## `GET /api/expenses` - list all expenses that are not already sent
**request**

`empty`

**response**
```js
[
  {
    date: '<inserted date>',
    client: '<client_name>',
    price: '<price VAT>',
    user: '<user name>',
  },
]
```

## `POST /api/emails` - send an email to the accountent with all expenses not already sent
**request**

`empty`

**response**

`empty`
