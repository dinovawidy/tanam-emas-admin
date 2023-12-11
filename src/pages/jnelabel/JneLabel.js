import React from "react";
import { useEffect } from "react";

const JneLabel = () => {
  const print = () => {
    window.print();
  };

  useEffect(() => {
    print();
  }, []);

  return (
    <div className=" bg-white h-screen w-screen text-center">
      <table className="h-[48em] w-[38em] border-black border ">
        <tbody>
          <tr>
            <td className="">
              <img src="" alt="tanam-emas" />
            </td>
            <td className="">
              <img src="" alt="jne" />
            </td>
          </tr>
          <tr className="border-y border-black">
            <td colspan="2">Order Number : INV</td>
          </tr>
          <tr className="border-y border-black">
            <td colspan="2">
              <img src="" alt="barcode" />
              <p></p>
            </td>
          </tr>
          <tr className="text-left align-top">
            <td className="border-black border px-2 py-3">
              <p>From : </p>
            </td>
            <td className="border-black border px-2 py-3">
              <p>To : </p>
              <p>Nama</p>
              <p>Alamat Lengkap</p>
              <p>Kelurahan</p>
              <p>Kecamatan</p>
              <p>Provinsi, PostalCode</p>
              <p>No. HP</p>
            </td>
          </tr>
          <tr>
            <td className="border-black border">YES</td>
            <td className="border-black border">CGK</td>
          </tr>
          <tr className="border-black border text-left">
            <td className="px-2">
              <p>Date :</p>
              <p>Good Type :</p>
              <p>Detail Goods :</p>
              <p>Packing Kayu :</p>
            </td>
            <td className="px-2">
              <p>Qty :</p>
              <p>Weight :</p>
              <p>Insurance :</p>
              <p>COD :</p>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div className="flex flex-row">
                <div className="w-20"></div>
                <div className="flex-1 text-center">
                  <h3>TANPA VIDEO UNBOXING</h3>
                  <h3>KELUHAN TIDAK DAPAT DIAJUKAN</h3>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default JneLabel;
