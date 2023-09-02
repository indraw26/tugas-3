import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Mahasiswa = () => {
  const params = useParams();
  const data_mahasiswa = {
    tahun_masuk: "20" + params.id.substring(0, 2),
    kode_prodi: parseInt(params.id.substring(4, 6)),
    id: parseInt(params.id.substring(6, 10)),
  };

  const [mahasiswa, setMahasiswa] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://strapi-rygs.onrender.com/api/prodis"
      );
      const kelas = res.data.data[0].attributes.prodi[0]
        .find((prodi) => prodi.kode_prodi == data_mahasiswa.kode_prodi)?.mahasiswa.find(
          (angkatan) => angkatan.tahun_masuk == data_mahasiswa.tahun_masuk
        )?.data;

      const mahasiswa = kelas.cuti.concat(kelas.pagi).concat(kelas.malam).find((mahasiswa)=> mahasiswa.id ==data_mahasiswa.id);

      setMahasiswa(mahasiswa || {}); // Update State
    };
    fetchData();
  }, []);


  return (
    <div>
      <h1>Data Mahasiswa</h1>
      {mahasiswa ? (
        <div>
          <p>NPM: {params.id}</p>
          <p>Nama: {mahasiswa.nama}</p>
          <p>Jenis Kelamin: {{ L: "Laki-Laki", P: "Perempuan" }[mahasiswa.jenis_kelamin]}</p>
          <p>Alamat: {mahasiswa.alamat}</p>
          <p>Hobi: {mahasiswa.hobi?.join(", ")}</p>
        </div>
      ):(
      <p>Mahasiswa Tidak Terdaftar</p>
      )}
    </div>
  );
};
export default Mahasiswa;
