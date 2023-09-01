import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Mahasiswa = () => {
  const npm = useParams();
  const data_mahasiswa = [
    {
      angkatan: "20" + npm.id.substring(0, 2),
      kode_prodi: parseInt(npm.id.substring(4, 6)),
      id: parseInt(npm.id.slice(-1)),
    },
  ];
  // console.log(data_mahasiswa)

  const [prodis, setProdis] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://strapi-rygs.onrender.com/api/prodis"
      );
      setProdis(res.data.data[0].attributes.prodi[0]);
    };
    fetchData();
  }, []);

  return (
    <>
      <p>Daftar Mahasiswa</p>
      {prodis.map((prodi, i) => {
        <div key={i}>
              {prodi.mahasiswa.map((angkatan, j) => {
                  <p>{angkatan.tahun_masuk}</p>
            //     const kelas = Object.entries(angkatan.data);
            //     {
            //       data_mahasiswa.find(
            //         (data_angkatan) =>
            //           data_angkatan.angkatan == angkatan.tahun_masuk
            //       ) ? (
            //         <div>
            //           {kelas.map((item, k) => {
            //             {
            //               item[1].map((daftarMahasiswa, l) => {
            //                 {
            //                   data_mahasiswa.find(
            //                     (data_id) => data_id.id == daftarMahasiswa.id
            //                   ) ? (
            //                     <div>
            //                       <p>NPM : {npm}</p>
            //                       <p>Nama: {daftarMahasiswa.nama}</p>
            //                       <p>Alamat: {daftarMahasiswa.alamat}</p>
            //                       <p>Hobi: {daftarMahasiswa.hobi.join(", ")}</p>
            //                     </div>
            //                   ) : (
            //                     <p>Data tidak terdaftar</p>
            //                   );
            //                 }
            //               });
            //             }
            //           })}
            //         </div>
            //       ) : (
            //         <p>Data Tidak Terdata</p>
            //       );
            //     }
              })}
            // </div>
      })}
    </>
  );
};
export default Mahasiswa;
