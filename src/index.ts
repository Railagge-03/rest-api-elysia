import { Elysia, t } from 'elysia'


interface Mahasiswa {
  id: number
  nama: string
  jurusan: string
  semester: number
}


let mahasiswaList: Mahasiswa[] = [
  {
    id: 1,
    nama: 'Ragil',
    jurusan: 'Informatika',
    semester: 6
  },
  {
    id: 2,
    nama: 'Budi',
    jurusan: 'Sistem Informasi',
    semester: 4
  }
]

let nextId = 3


const app = new Elysia()


  .get('/mahasiswa', () => {
    return {
      success: true,
      message: 'Data mahasiswa berhasil diambil',
      data: mahasiswaList
    }
  })


  .get('/mahasiswa/:id', ({ params, set }) => {
    const id = Number(params.id)

    if (!Number.isInteger(id) || id < 1) {
      set.status = 400

      return {
        success: false,
        message: 'ID mahasiswa tidak valid'
      }
    }

    const mahasiswa = mahasiswaList.find(
      (item) => item.id === id
    )

    if (!mahasiswa) {
      set.status = 404

      return {
        success: false,
        message: 'Mahasiswa tidak ditemukan'
      }
    }

    return {
      success: true,
      message: 'Data mahasiswa berhasil ditemukan',
      data: mahasiswa
    }
  })


  .post(
    '/mahasiswa',
    ({ body, set }) => {
      const mahasiswaBaru: Mahasiswa = {
        id: nextId++,
        nama: body.nama,
        jurusan: body.jurusan,
        semester: body.semester
      }

      mahasiswaList.push(mahasiswaBaru)

      set.status = 201

      return {
        success: true,
        message: 'Mahasiswa berhasil ditambahkan',
        data: mahasiswaBaru
      }
    },
    {
      body: t.Object({
        nama: t.String({ minLength: 1 }),
        jurusan: t.String({ minLength: 1 }),
        semester: t.Integer({ minimum: 1 })
      })
    }
  )


  .put(
    '/mahasiswa/:id',
    ({ params, body, set }) => {
      const id = Number(params.id)

      if (!Number.isInteger(id) || id < 1) {
        set.status = 400

        return {
          success: false,
          message: 'ID mahasiswa tidak valid'
        }
      }

      const index = mahasiswaList.findIndex(
        (item) => item.id === id
      )

      if (index === -1) {
        set.status = 404

        return {
          success: false,
          message: 'Mahasiswa tidak ditemukan'
        }
      }

      const mahasiswaBaru: Mahasiswa = {
        id,
        nama: body.nama,
        jurusan: body.jurusan,
        semester: body.semester
      }

      mahasiswaList[index] = mahasiswaBaru

      return {
        success: true,
        message: 'Data mahasiswa berhasil diperbarui',
        data: mahasiswaBaru
      }
    },
    {
      body: t.Object({
        nama: t.String({ minLength: 1 }),
        jurusan: t.String({ minLength: 1 }),
        semester: t.Integer({ minimum: 1 })
      })
    }
  )


  .patch(
    '/mahasiswa/:id',
    ({ params, body, set }) => {
      const id = Number(params.id)

      if (!Number.isInteger(id) || id < 1) {
        set.status = 400

        return {
          success: false,
          message: 'ID mahasiswa tidak valid'
        }
      }

      const mahasiswa = mahasiswaList.find(
        (item) => item.id === id
      )

      if (!mahasiswa) {
        set.status = 404

        return {
          success: false,
          message: 'Mahasiswa tidak ditemukan'
        }
      }
https://github.com/Railagge-03/rest-api-elysia.git
      Object.assign(mahasiswa, body)

      return {
        success: true,
        message: 'Sebagian data mahasiswa berhasil diperbarui',
        data: mahasiswa
      }
    },
    {
      body: t.Object({
        nama: t.Optional(
          t.String({ minLength: 1 })
        ),
        jurusan: t.Optional(
          t.String({ minLength: 1 })
        ),
        semester: t.Optional(
          t.Integer({ minimum: 1 })
        )
      })
    }
  )


  .delete('/mahasiswa/:id', ({ params, set }) => {
    const id = Number(params.id)

    if (!Number.isInteger(id) || id < 1) {
      set.status = 400

      return {
        success: false,
        message: 'ID mahasiswa tidak valid'
      }
    }

    const index = mahasiswaList.findIndex(
      (item) => item.id === id
    )

    if (index === -1) {
      set.status = 404

      return {
        success: false,
        message: 'Mahasiswa tidak ditemukan'
      }
    }

    const mahasiswaDihapus = mahasiswaList[index]

    mahasiswaList.splice(index, 1)

    return {
      success: true,
      message: 'Mahasiswa berhasil dihapus',
      data: mahasiswaDihapus
    }
  })


  .connect('/mahasiswa', ({ set }) => {
    set.status = 501

    return {
      success: false,
      message: 'CONNECT memerlukan implementasi HTTP tunnel/proxy',
      detail:
        'Endpoint CONNECT dikenali, tetapi pembentukan tunnel belum diimplementasikan.'
    }
  })


  .listen(3000)

console.log(
  `REST API berjalan di http://localhost:${app.server?.port}`
)




