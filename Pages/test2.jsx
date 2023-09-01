import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Mahasiswa = () => {
  const { id } = useParams();
  const [mahasiswaData, setMahasiswaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://strapi-rygs.onrender.com/api/prodis");
        const prodis = res.data.data[0].attributes.prodi[0];
        const filteredMahasiswa = angkatan.tahun_masuk.slice(2);
          return prodis.kode_prodi === parseInt(id.substring(4, 6)) && tahun_masuk === id.substring(0, 2);
        });
        setMahasiswaData(filteredMahasiswa);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <p>Daftar Mahasiswa</p>
      {mahasiswaData.length > 0 ? (
        mahasiswaData.map((angkatan, i) => (
          <div key={i}>
            {Object.entries(angkatan.data).map(([kelas, daftarMahasiswa], j) => (
              <div key={j}>
                {daftarMahasiswa.map((mahasiswa, k) => (
                  <div key={k}>
                    <p>NPM: {mahasiswa.npm}</p>
                    <p>Nama: {mahasiswa.nama}</p>
                    <p>Alamat: {mahasiswa.alamat}</p>
                    <p>Hobi: {mahasiswa.hobi.join(", ")}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Data Tidak Ditemukan</p>
      )}
    </div>
  );
};

export default Mahasiswa;