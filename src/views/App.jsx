import { FcMoneyTransfer } from "react-icons/fc"
import { Md10K, MdAttachMoney, MdCalculate, MdMoney, MdMoneyOff, MdOutlineBuild } from "react-icons/md"
import { useRef, useState } from "react"

const App = () => {
    const plafon = useRef(null)
    const dp = useRef(null)
    const tenor = useRef(null)
    const [pilihTenor, setPilihTenor] = useState([3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    const [bulan, setBulan] = useState(0)
    const [hasil, setHasil] = useState({
        plafon: 0,
        bulan: 0,
        angsuran: 0
    })
    const plafonHandle = (e) => {
        if (plafon.current.value.length > 0) {
            let angka = parseInt(plafon.current.value.replace(/\D/g, ''), 10)
            plafon.current.value = angka.toLocaleString()
            setPilihTenor(() => {
                let bulan = []
                switch (true) {
                    case angka <= 10000000:
                        bulan = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                        break;
                    case angka <= 15000000:
                        bulan = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
                        break;
                    case angka <= 20000000:
                        bulan = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
                        break;
                    case angka < 50000000:
                        bulan = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
                        break;
                    default:
                        bulan = [12, 24, 36, 48, 60];
                        break;
                }
                return bulan
            })
        }
        setBulan(0)
        setHasil({
            plafon: 0,
            bulan: 0,
            angsuran: 0
        })
    }
    const dpHandle = (e) => {
        if (dp.current.value.length > 0) {
            let angka = parseInt(dp.current.value.replace(/\D/g, ''), 10)
            dp.current.value = angka.toLocaleString()
        }
    }
    const tenorHandle = (e) => {
        setBulan(e.target.value)
        setHasil({
            plafon: 0,
            bulan: 0,
            angsuran: 0
        })
    }
    const hitung = () => {
        let p = plafon.current.value.length > 0 ? parseInt(plafon.current.value.replace(/\D/g, ''), 10) : 0
        let d = dp.current.value.length > 0 ? parseInt(dp.current.value.replace(/\D/g, ''), 10) : 0
        let t = parseInt(tenor.current.value, 10)
        let margin = 0
        if (p <= 10000000) {
            margin = t <= 3 ? 25 : t <= 5 ? 30 : t <= 7 ? 40 : t <= 9 ? 45 : 50
        } else if (p <= 15000000) {
            margin = t <= 4 ? 20 : t <= 6 ? 25 : t <= 8 ? 30 : t <= 10 ? 35 : t <= 12 ? 40 : t <= 14 ? 45 : t <= 16 ? 50 : 55
        } else if (p <= 20000000) {
            switch (true) {
                case t <= 11:
                    margin = 35
                    break;
                case t <= 13:
                    margin = 40
                    break;
                case t <= 15:
                    margin = 45
                    break;
                case t <= 17:
                    margin = 50
                    break;
                default:
                    margin = 55
            }
        } else if (p < 50000000) {
            switch(true){
                case t <= 13:
                    margin = 35;
                    break;
                case t <= 16:
                    margin = 40;
                    break;
                case t <= 19:
                    margin = 45;
                    break;
                case t <= 22:
                    margin = 50;
                    break;
                default:
                    margin = 55;
                    break;
            }
        } else {
            switch (t) {
                case 12:
                    margin = p <= 50000000 ? 16 : p <= 100000000 ? 14 : 13
                    break;
                case 24:
                    margin = p <= 50000000 ? 32 : p <= 100000000 ? 28 : 27
                    break;
                case 36:
                    margin = p <= 50000000 ? 58 : p <= 100000000 ? 43 : 40
                    break;
                case 48:
                    margin = p <= 50000000 ? 67 : p <= 100000000 ? 60 : 54
                    break;
                case 60:
                    margin = p <= 50000000 ? 87 : p <= 100000000 ? 76 : 69
                    break;
                default:
                    margin = p <= 50000000 ? 16 : p <= 100000000 ? 14 : 13
                    break;
            }
        }
        let p_up = p * margin / 100 + p
        setHasil(hasil => (
            {
                bulan: t,
                plafon: p,
                angsuran: Math.ceil((p_up - d) / t)
            }
        ))
    }
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-indigo-500">
                <Navbar />
                <div className="mt-3 container px-4 mx-auto">
                    <div className="mb-3">
                        <label htmlFor="plafon" className="block mb-2 font-medium text-white tracking-wider">Plafon</label>
                        <div className="relative">
                            <input type="text" id="plafon" className="w-full pe-4 ps-10 py-3 text-gray-600 rounded-lg outline-none focus:border-indigo-500 shadow text-end text-xl placeholder:text-start" pattern="[0-9]*" ref={plafon} onKeyUp={plafonHandle} placeholder="Masukkan plafon" />
                            <FcMoneyTransfer className="absolute text-3xl top-0 left-0 ms-2 mt-3 " />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dp" className="block mb-2 font-medium text-white tracking-wider">Uang muka</label>
                        <div className="relative">
                            <input type="text" id="dp" className="w-full pe-4 ps-10 py-3 text-gray-600 rounded-lg outline-none focus:border-indigo-500 shadow text-end text-xl placeholder:text-start" pattern="[0-9]*" ref={dp} onKeyUp={dpHandle} placeholder="Masukkan uang muka" />
                            <FcMoneyTransfer className="absolute text-3xl top-0 left-0 ms-2 mt-3 " />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tenor" className="block mb-2 font-medium text-white tracking-wider">Tenor</label>
                        <select id="tenor" className="w-full rounded-lg text-xl px-3 py-2 text-gray-600" ref={tenor} onChange={tenorHandle} value={bulan}>
                            <option value="0">-- Pilih bulan --</option>
                            {pilihTenor.map(e => (
                                <option value={e}>{e} Bulan</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <button type="button" className="px-3 py-2 text-xl w-full bg-gradient-to-b from-green-500 to-green-500 text-white rounded-xl font-medium" onClick={hitung} disabled={bulan == 0}>Hitung</button>
                    </div>
                    <div className="px-3 py-4 bg-slate-50 rounded-lg">
                        <h1 className="flex items-center gap-2 font-medium">
                            <MdCalculate className="text-2xl" />
                            Detail Angsuran
                        </h1>
                        <table className="w-full mt-4">
                            <tbody>
                                <tr className="*:px-3 *:font-bold *:text-gray-600 *:text-xl">
                                    <td>Plafon</td>
                                    <td className="w-[15px]">:</td>
                                    <td className="flex justify-between">Rp. <span className="block text-end">{hasil.plafon.toLocaleString()}</span></td>
                                </tr>
                                <tr className="*:px-3 *:font-bold *:text-gray-600 *:text-xl">
                                    <td>Tenor</td>
                                    <td className="w-[15px]">:</td>
                                    <td className="flex justify-end"><span className="block text-end">{hasil.bulan} Bulan</span></td>
                                </tr>
                                <tr className="*:px-3 *:font-bold *:text-gray-600 *:text-xl">
                                    <td>Angsuran</td>
                                    <td className="w-[15px]">:</td>
                                    <td className="flex justify-between">Rp. <span className="block text-end">{hasil.angsuran.toLocaleString()}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

const Navbar = () => {
    return (
        <>
            <nav className="bg-white dark:bg-gray-900  border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <MdOutlineBuild className="text-3xl text-indigo-600" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Plafon Calc</span>
                    </a>
                </div>
            </nav>
        </>
    )
}

export default App