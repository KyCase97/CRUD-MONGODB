
# API CRUD MAHASISWA

API Mahasiswa merupakan sebuah RESTful API yang memungkinkan Anda untuk melakukan operasi CRUD (Create, Read, Update, Delete) terhadap data mahasiswa.


## API Reference

#### Get all items

```http
  GET /mahasiswa/
```

#### Get mahasiswa

```http
  GET /mahasiswa/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of mahasiswa to fetch |

#### Delete mahasiswa

```http
  DELETE /mahasiswa/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of mahasiswa to Delete |

