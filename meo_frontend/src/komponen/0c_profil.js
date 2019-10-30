import React, {Component} from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Profil extends Component{
  
    constructor(props){
        super(props)
        this.state = {
            tipe: '', model: [], modelPilih: '', fotoPilih: '', plat: '', seat: '', th: '', info: '',
            id: '', nama: '', email: '', password: '', telp: '', alamat: '', kota: '', 
            foto: '', file: '',
            mymobil: [], jmlmobil: 0
        }
    }

    componentDidMount(){
        var url = this.props.host
        axios.get(url + `/user/${this.props.match.params.uid}`)
        .then((x)=>{
            this.setState({
                id: x.data[0].uid,
                nama: x.data[0].unama,
                email: x.data[0].uemail,
                password: x.data[0].upassword,
                telp: x.data[0].utelp,
                alamat: x.data[0].ualamat,
                kota: x.data[0].ukota,
                foto: x.data[0].ufoto,
            })
            axios.get(url + `/car/${this.props.match.params.uid}`)
            .then((x)=>{
                this.setState({
                    mymobil: x.data,
                    jmlmobil: x.data.length
                })
                toast.success(`🎉 Selamat datang, ${this.state.nama} 🤗`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });  
            }).catch((x)=>{
                console.log('no')
            })
        }).catch((x)=>{
            console.log('no')
        })
    }

    namaInput = (event) => {
        this.setState({nama: event.target.value});
    }
    emailInput = (event) => {
        this.setState({email: event.target.value});
    }
    passInput = (event) => {
        this.setState({password: event.target.value});
    }
    telpInput = (event) => {
        this.setState({telp: event.target.value});
    }
    alamatInput = (event) => {
        this.setState({alamat: event.target.value});
    }
    kotaInput = (event) => {
        this.setState({kota: event.target.value});
    }

    platInput = (event) => {
        this.setState({plat: event.target.value});
    }
    seatInput = (event) => {
        this.setState({seat: event.target.value});
    }
    thInput = (event) => {
        this.setState({th: event.target.value});
    }
    infoInput = (event) => {
        this.setState({info: event.target.value});
    }

    postFoto = (e) => {
        this.setState({
            foto: e.target.files[0].name,
            file: e.target.files[0]
        }, ()=>{
            const formData = new FormData();
            formData.append('filename', this.state.file);
            console.log(formData)
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            var url = this.props.host + '/profile'
            axios.post(url, formData, config)
            .then((response) => {
                toast.success(`Foto ${response.data.fotoTerupload} sukses terupload 🤩 Klik Update profil untuk mengganti foto.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                // console.log(response.data)
                this.setState({
                    foto: response.data.fotoTerupload
                })
            }).catch((error) => {
                toast.error(`Foto gagal diperbarui 😭 silakan coba lagi 🙏`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
        })
    }

    updateProfil = () => {
        var id = this.state.id ? this.state.id : null
        var nama = this.state.nama ? this.state.nama : null
        var email = this.state.email ? this.state.email : null
        var password = this.state.password ? this.state.password : null
        var foto = this.state.foto ? this.state.foto : null
        var telp = this.state.telp ? this.state.telp : null
        var alamat = this.state.alamat ? this.state.alamat : null
        var kota = this.state.kota ? this.state.kota : null 
        var url = this.props.host
        axios.put(url + '/update', {
            "unama": nama,
            "uemail": email,
            "upassword": password,
            "ufoto": foto,
            "ualamat": alamat,
            "ukota": kota,
            "utelp": telp,
            "uid": id
        }).then((x)=>{
            if(x.data.statusUpdate == 'ok'){
                this.setState({
                    nama: nama, email: email, password: password, foto: foto, 
                    telp: telp, alamat: alamat, kota: kota
                })
                toast.success(`🎉 Profil sukses terupdate 👍`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                window.location.replace(`/profil/${this.state.id}`)
            } else {
                toast.error(`😭 Maaf, profil gagal terupdate. Coba lagi nanti 👍`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }).catch((x)=>{
            toast.error(`😭 Maaf, profil gagal terupdate. Coba lagi nanti 👍`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        })
    }

    tambahMobil = () => {
        var id = this.props.user.uid
        var tipe = this.state.tipe ? this.state.tipe : null
        var modelPilih = this.state.modelPilih ? this.state.modelPilih : null
        var fotoPilih = this.state.fotoPilih ? this.state.fotoPilih : null
        var seat = this.state.seat ? this.state.seat : null
        var plat = this.state.plat ? this.state.plat : null
        var th = this.state.th ? this.state.th : null
        var info = this.state.info ? this.state.info : null
        var url = this.props.host
        axios.post(url + '/car', {
            uid: id,
            ctipe: tipe,
            cmodel: modelPilih,
            cseat: seat,
            cth: th,
            cplat: plat,
            cfoto: fotoPilih,
            cinfo: info,
        }).then((x)=>{
            if(x.data.status == 'ok'){
                toast.success(`🎉 Mobil sukses ditambahkan 👍`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                window.location.replace(`/profil/${this.state.id}`)
            } else {
                toast.error(`😭 Maaf, profil gagal terupdate. Coba lagi nanti 👍`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }).catch((x)=>{
            toast.error(`😭 Maaf, profil gagal terupdate. Coba lagi nanti 👍`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        })
    }

    render(){

    const reg = new Date(this.props.user.utglreg)
    const tglreg = reg.getDate() + '-' + (reg.getMonth() + 1) + '-' + reg.getFullYear()
    const update = new Date(this.props.user.utglupdate)
    const tglupdate = update.getDate() + '-' + (update.getMonth() + 1) + '-' + update.getFullYear()
    
    var listMobil = this.state.model.map((val, i)=>{
        return (
            <a className="dropdown-item" style={{cursor:'pointer'}} 
            onClick={(e)=>{this.setState({modelPilih: val.nama, fotoPilih: val.foto})}}>
                <img src={val.foto} style={{width:'30px', height:'20px'}}/>&nbsp;&nbsp;{val.nama}
            </a>
        )
    })

    var myMobil = this.state.mymobil.map((val, i)=>{
        return (
            <div key={i} className="col-lg-2 col-sm-4">
                <div className="single_pricing_part">
                    <a style={{cursor:'pointer'}}>
                        <img src={val.cfoto}/>
                        <a className="pricing_btn">
                            {val.cmodel}
                        </a>
                        <p className="pricing_btn">
                            {val.cplat}
                        </p>
                    </a>
                </div>
            </div>
        )
    })

    return(
        <div>

        <ToastContainer style={{marginTop:'100px', fontSize:16}}/>
        
        {/* layanan */}
        <section id="layanan" className="pricing_part section_padding home_page_pricing">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="mt-5 section_tittle">
                            <h2>Profil Saya</h2>
                            <p>Akun Terdaftar: <b>{tglreg}</b> | Terakhir update: <b>{tglupdate}</b></p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-sm-6">
                        <div className="single_pricing_part">
                            <img style={{width:'200px', height:'200px'}} 
                            src={this.state.foto ? `${this.props.host}/profile/${this.state.foto}` : '/img/user.png'} alt=''/>
                            <br/>
                            <label className='btn btn-warning text-white' style={{cursor: 'pointer'}} for="upload-photo">
                                <i className="fas fa-camera"></i>&nbsp;&nbsp;Upload Foto
                            </label>
                            <input onChange={this.postFoto}
                            style={{opacity: 0, position: 'absolute', zIndex: -1}} type="file" name="photo" id="upload-photo" />
                        </div>
                    </div>
                    <div className="col-lg-8 col-sm-6">
                        
                        <div className='row'>
                            {/* nama */}
                            <div className="col-sm-6 input-group mb-3">
                                <div className="input-group-prepend">
                                    <span style={{backgroundColor:'#ffe4b8', color:'orange'}} className="input-group-text" id="basic-addon1">
                                        <i className="fas fa-id-card"></i>
                                    </span>
                                </div>
                                <input value={this.state.nama} onChange={this.namaInput}
                                style={this.state.nama ? {fontWeight:'bold'} : {fontStyle:'italic'}}
                                type="text" className="form-control" placeholder='Ketik nama Anda ...'
                                aria-label="Username" aria-describedby="basic-addon1"/>
                            </div>

                            {/* email */}
                            <div className="col-sm-6 input-group mb-3">
                                <div className="input-group-prepend">
                                    <span style={{backgroundColor:'#ffe4b8', color:'orange'}} className="input-group-text" id="basic-addon1">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                                <input value={this.state.email} onChange={this.emailInput}
                                style={this.state.email ? {fontWeight:'bold'} : {fontStyle:'italic'}}
                                type="text" className="form-control" placeholder="Ketik email Anda ..." 
                                aria-label="Email" aria-describedby="basic-addon1"/>
                            </div>
                        </div>

                        <div className='row'>
                            {/* telp */}
                            <div className="col-sm-6 input-group mb-3">
                                <div className="input-group-prepend">
                                    <span style={{backgroundColor:'#ffe4b8', color:'orange'}} className="input-group-text" id="basic-addon1">
                                        <i className="fas fa-phone-alt"></i>
                                    </span>
                                </div>
                                <input value={this.state.telp} onChange={this.telpInput}
                                style={this.state.telp ? {fontWeight:'bold'} : {fontStyle:'italic'}}
                                type="number" className="form-control" placeholder="Ketik no. telephone Anda ..." 
                                aria-label="Email" aria-describedby="basic-addon1"/>
                            </div>

                            {/* password */}
                            <div className="col-sm-6 input-group mb-3">
                                <div className="input-group-prepend">
                                    <span style={{backgroundColor:'#ffe4b8', color:'orange'}} className="input-group-text" id="basic-addon1">
                                        <i className="fas fa-unlock-alt"></i>
                                    </span>
                                </div>
                                <input value={this.state.password} onChange={this.passInput}
                                style={this.state.password ? {fontWeight:'bold'} : {fontStyle:'italic'}}
                                type="password" className="form-control" 
                                placeholder="Ketik password Anda ..."
                                aria-label="Email" aria-describedby="basic-addon1"/>
                            </div>
                        </div>

                        {/* alamat */}
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span style={{backgroundColor:'#ffe4b8', color:'orange'}} className="align-items-start input-group-text" id="basic-addon1">
                                    <i className="mt-1 fas fa-map-marker-alt"></i>
                                </span>
                            </div>
                            <textarea value={this.state.alamat} onChange={this.alamatInput}
                            style={this.state.alamat ? {fontWeight:'bold'} : {fontStyle:'italic'}}
                            type="text" className="form-control" placeholder="Ketik alamat Anda ..."
                            aria-label="Email" aria-describedby="basic-addon1"></textarea>
                        </div>

                        {/* kota */}
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span style={{backgroundColor:'#ffe4b8', color:'orange'}} className="input-group-text" id="basic-addon1">
                                    <i className="fas fa-map-marked-alt"></i>
                                </span>
                            </div>
                            <input value={this.state.kota} onChange={this.kotaInput}
                            style={this.state.kota ? {fontWeight:'bold'} : {fontStyle:'italic'}}
                            type="text" className="form-control" placeholder="Ketik kota Anda ..."
                            aria-label="Email" aria-describedby="basic-addon1"/>
                        </div>

                        <div className='row justify-content-end'>
                            <button onClick={()=>{window.location.replace(`/profil/${this.state.id}`)}}
                            type="button" className="btn btn-danger">
                                <i className="fas fa-window-close"></i>&nbsp;&nbsp;Batal
                            </button>
                            <button onClick={this.updateProfil} 
                            type="button" className="ml-2 mr-3 btn btn-success text-white">
                                <i className="fas fa-edit"></i>&nbsp;&nbsp;Update
                            </button>
                        </div>

                    </div>

                </div>

                <hr className='mt-5'></hr>
                
                <div className="mt-5 section_tittle">
                    <h2>Toyota Saya</h2>
                    <p>Jumlah Toyota Terdaftar: <b>{this.state.jmlmobil} mobil</b></p>
                </div>
                <div className="row">
                    
                    {myMobil ? myMobil : <></>}

                    <div className="col-lg-2 col-sm-4">
                        <div className="single_pricing_part">
                            <a style={{cursor:'pointer'}} data-toggle="modal" data-target="#addMobilModal">
                                <p><i className="fas fa-plus-circle"></i></p>
                                <p className="mt-3">
                                    <a className="pricing_btn">
                                    Tambah Mobil
                                    </a>
                                </p>
                            </a>
                        </div>
                    </div>

                </div>

            </div>
            <img src="/img/animate_icon/Ellipse_2.png" alt="" className="feature_icon_2 custom-animation2"/>

        </section>


        {/* modal add mobil */}
        <div style={{marginTop:'150px'}} className="modal fade" id="addMobilModal" tabindex="-1" role="dialog" 
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
            <div className="modal-header bg-warning">
                <h5 className="text-white modal-title" id="exampleModalLabel">
                    Tambahkan Mobil ke Profil
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" className='text-white'>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                
                <div className='row'>
                    {/* tipe */}
                    <div className="dropdown col-sm-6">
                        <button className="btn btn-secondary btn-block dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.tipe ? this.state.tipe : 'Pilih tipe'}
                        </button>
                        <div className="ml-5 dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" style={{cursor:'pointer'}} 
                            onClick={(e)=>{
                                this.setState({tipe: e.target.text, modelPilih:'', 
                                model: [
                                    {nama:'Calya', foto:'/img/toyota/calya.png'}, 
                                    {nama:'Sienta', foto:'/img/toyota/sienta.png'},
                                    {nama:'Avanza', foto:'/img/toyota/avanza.png'},
                                    {nama:'Veloz', foto:'/img/toyota/veloz.png'},
                                    {nama:'Venturer', foto:'/img/toyota/venturer.png'},
                                    {nama:'Voxy', foto:'/img/toyota/voxy.png'},
                                    {nama:'Kijang Innova', foto:'/img/toyota/kijanginnova.png'},
                                    {nama:'Alphard', foto:'/img/toyota/alphard.png'},
                                    {nama:'Vellfire', foto:'/img/toyota/vellfire.png'}
                                ]})}}>
                                MPV
                            </a>
                            <a className="dropdown-item" style={{cursor:'pointer'}} 
                            onClick={(e)=>{
                                this.setState({tipe: e.target.text, modelPilih:'', 
                                model:[
                                    {nama:'Corolla Altis', foto:'/img/toyota/corollaaltis.png'},
                                    {nama:'Camry', foto:'/img/toyota/camry.png'},
                                    {nama:'Vios', foto:'/img/toyota/vios.png'}
                                ]})}}>
                                Sedan
                            </a>
                            <a className="dropdown-item" style={{cursor:'pointer'}} 
                            onClick={(e)=>{
                                this.setState({tipe: e.target.text, modelPilih:'', 
                                model:[
                                    {nama:'Fortuner', foto:'/img/toyota/fortuner.png'},
                                    {nama:'C-HR', foto:'/img/toyota/chr.png'},
                                    {nama:'Rush', foto:'/img/toyota/rush.png'},
                                ]})}}>
                                SUV
                            </a>
                            <a className="dropdown-item" style={{cursor:'pointer'}} 
                            onClick={(e)=>{
                                this.setState({tipe: e.target.text, modelPilih:'', 
                                model: [
                                    {nama:'Corolla Altis Hybrid', foto:'/img/toyota/corollaaltishybrid.png'},
                                    {nama:'C-HR Hybrid', foto:'/img/toyota/chrhybrid.png'},
                                    {nama:'Alphard Hybrid', foto:'/img/toyota/alphardhybrid.png'},
                                ]})}}>
                                Hybrid
                            </a>
                            <a className="dropdown-item" style={{cursor:'pointer'}} 
                            onClick={(e)=>{this.setState({tipe: e.target.text, modelPilih:'', 
                            model:[
                                {nama:'Yaris', foto:'/img/toyota/yaris.png'},
                                {nama:'Agya', foto:'/img/toyota/agya.png'},
                            ]})}}>
                                Hatchback
                            </a>
                            <a className="dropdown-item" style={{cursor:'pointer'}} 
                            onClick={(e)=>{this.setState({tipe: e.target.text, modelPilih:'', 
                            model:[
                                {nama:'Hilux D Cab', foto:'/img/toyota/hiluxdcab.png'},
                                {nama:'Hilux S Cab', foto:'/img/toyota/hiluxscab.png'},
                                {nama:'HiAce', foto:'/img/toyota/hiace.png'},
                                {nama:'Dyna', foto:'/img/toyota/dyna.png'},
                            ]})}}>
                                Commercial
                            </a>
                            <a className="dropdown-item" style={{cursor:'pointer'}} 
                            onClick={(e)=>{this.setState({tipe: e.target.text, modelPilih:'', 
                            model: [
                                {nama:'Toyota 86', foto:'/img/toyota/toyota86.png'},
                                {nama:'Toyota Supra', foto:'/img/toyota/toyotasupra.png'},
                            ]})}}>
                                Sport
                            </a>
                        </div>
                    </div>
                    {/* model */}
                    {
                        this.state.model[0]
                        ?
                        (
                            <div className="dropdown col-sm-6">
                                <button className="btn btn-secondary btn-block dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.state.modelPilih ? <><img src={this.state.fotoPilih} style={{width:'30px', height:'20px'}}/>&nbsp;&nbsp;{this.state.modelPilih}</> : 'Pilih Model'}
                                </button>
                                <div className="ml-5 dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {listMobil}
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="dropdown col-sm-6">
                                <button className="disabled btn btn-secondary btn-block dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Pilih Model
                                </button>
                            </div>
                        )
                    }
                    
                </div>
                
                <div className="row">
                    
                    {/* plat */}
                    <div className="col-sm-4 input-group my-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                <i className="fas fa-id-card"></i>
                            </span>
                        </div>
                        <input 
                        value={this.state.plat} onChange={this.platInput} 
                        style={this.state.plat ? {fontWeight:'bold'} : {fontStyle:'italic'}}
                        type="text" className="form-control" placeholder="Plat nomor ..." 
                        aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                    {/* seat */}
                    <div className="col-sm-4 input-group my-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                <i className="fas fa-users"></i>
                            </span>
                        </div>
                        <input 
                        value={this.state.seat} onChange={this.seatInput} 
                        style={this.state.seat ? {fontWeight:'bold'} : {fontStyle:'italic'}}
                        type="number" className="form-control" placeholder="Jumlah seat ..." 
                        aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                    {/* th */}
                    <div className="col-sm-4 input-group my-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                <i className="far fa-calendar"></i>
                            </span>
                        </div>
                        <input 
                        value={this.state.th} onChange={this.thInput} 
                        style={this.state.th ? {fontWeight:'bold'} : {fontStyle:'italic'}}
                        type="number" className="form-control" placeholder="Tahun ..." 
                        aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                </div>

                {/* info */}
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="align-items-start input-group-text" id="basic-addon1">
                            <i className="fas fa-info-circle mt-1"></i>
                        </span>
                    </div>
                    <textarea 
                    value={this.state.info} onChange={this.infoInput} 
                    style={this.state.info ? {fontWeight:'bold'} : {fontStyle:'italic'}}
                    type="text" className="form-control" placeholder="Informasi tambahan ..." 
                    aria-label="Username" aria-describedby="basic-addon1"></textarea>
                </div>
                
            </div>
            <div className="modal-footer">
                <button onClick={()=>{this.setState({tipe:'', model:[], modelPilih:'', fotoPilih:'', plat:'', seat:'', th:''})}}
                type="button" className="btn btn-danger" data-dismiss="modal">
                    <i className="fas fa-window-close"></i>&nbsp;&nbsp;Batal
                </button>
                <button
                type="button" onClick={this.tambahMobil} className="btn btn-success text-white">
                    <i className="fas fa-plus-square"></i>&nbsp;&nbsp;Tambah
                </button>
            </div>
            </div>
        </div>
        </div>


        </div>
    )
  }
}

export default Profil