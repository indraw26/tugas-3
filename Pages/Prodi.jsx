import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Prodi = () => {
  const getNpm = (tahun_masuk, kode_prodi, id) =>
    tahun_masuk.slice(2) +
    (parseInt(tahun_masuk.slice(2)) + 4) +
    kode_prodi +
    id.toString().padStart(4, "0");
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

  const navigate = useNavigate();

  return (
    <>
      {prodis.map((prodi, i) => (
        <div key={i}>
          <ul>
            <li>{prodi.nama_prodi}</li>
            <li>Kepala: {prodi.kepala_prodi}</li>
            {/* <li>{prodi.sektretaris && "Sekretaris: " + prodi.sektretaris}</li> */}
            <li>
              {prodi.sektretaris ? "Sekretaris: " + prodi.sektretaris : ""}
            </li>
          </ul>

          {prodi.mahasiswa.map((angkatan, j) => {
            const kelas = Object.entries(angkatan.data);
            return (
              <div key={j}>
                <div style={{ marginTop: "20px" }}>
                  Angkatan: {angkatan.tahun_masuk}
                </div>

                {kelas.map((item, k) => (
                  <div key={k} style={{ marginBottom: "20px" }}>
                    <div>
                      Kelas <span className="kelas">{item[0]}</span>
                    </div>

                    {item[1].length > 0 ? (
                      <table border="1">
                        <thead>
                          <tr>
                            <th>NPM</th>
                            <th>Nama</th>
                            <th>Jenis Kelamin</th>
                            <th>Alamat</th>
                            <th>Hobi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item[1].map((mahasiswa, l) => (
                            <tr>
                              <td>
                                <a onClick={()=>navigate("../mahasiswa/"+getNpm(angkatan.tahun_masuk,prodi.kode_prodi,mahasiswa.id))}>
                                  {getNpm(angkatan.tahun_masuk,prodi.kode_prodi,mahasiswa.id)}
                                </a>
                              </td>
                              <td>{mahasiswa.nama}</td>
                              {/* <td>{mahasiswa.jenis_kelamin === "P" ? "Perempuan":"Laki-Laki"}</td> */}
                              <td>
                                {
                                  { L: "Laki-Laki", P: "Perempuan" }[
                                    mahasiswa.jenis_kelamin
                                  ]
                                }
                              </td>
                              <td>{mahasiswa.alamat}</td>
                              <td>{mahasiswa.hobi.join(", ")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div key={k}>
                        Tidak Ada Mahasiswa yang mengamnbil kelas ini.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Prodi;
