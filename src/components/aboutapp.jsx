import React from "react";

const AboutApp = () => {
  return (
    <div className="p-6 bg-krem dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Tentang Aplikasi
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        Task Management App ini berguna untuk memudahkan pengguna maupun admin untuk menambahkan dan mengedit tugas. Selain itu, juga berguna untuk memudahkan dalam melakukan management tugas-tugas yang diberikan dari admin.
      </p>

      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Aplikasi ini dibangun dengan menggunakan teknologi React
        untuk frontend dan JSON Server untuk manajemen data sederhana di
        backend. Hal ini memungkinkan pengelolaan data yang dinamis dan
        responsif tanpa memerlukan sistem backend yang kompleks dan ribet.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900 dark:text-gray-100">
        Fitur Utama
      </h2>
      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
        <li>Mengelola data tugas yang dibuat (CRUD).</li>
        <li>
          Mengelola data staff yang masih aktif bekerja di perusahaan.
        </li>
        <li>Menyambungkan tugas ke calender agar lebih gampang untuk memanage tugas agar sesuai dengan tenggat nya.</li>
        <li>
          Responsif dan mudah digunakan, baik di desktop maupun perangkat
          mobile.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900 dark:text-gray-100">
        Tujuan
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Tujuan utama aplikasi ini adalah untuk mempermudah pengelolaan tugas dan mempermudah dalam pengerjaan yang sesuai dengan target yang di tetapkan pada calender dan mempermudah dalam me-manage karyawan agar bisa mangecek kompeten karyawan dalam bekerja.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900 dark:text-gray-100">
        Teknologi yang Digunakan
      </h2>
      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
        <li>React untuk frontend.</li>
        <li>Tailwind CSS untuk styling responsif dan modern.</li>
        <li>JSON Server untuk backend sederhana.</li>
        <li>Node.js untuk menjalankan server JSON lokal.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900 dark:text-gray-100">
        Tim Pengembang
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Aplikasi ini dikembangkan sebagai solusi untuk memudahkan dalam mengelola tugas dari perusahaan guna untuk memajukan perusahaan agar lebih efisien dan produktif dalam menyelesaikan tugas.
      </p>
    </div>
  );
};

export default AboutApp;
