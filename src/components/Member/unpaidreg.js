import React, { useEffect, useState } from 'react';
import { UseAuth } from './authcontext';
import { Helmet } from 'react-helmet';
import QRCode from 'qrcode';
import { useHistory } from 'react-router-dom';

function UnpaidReg() {
    console.log(QRCode)
    const { logout, currentUser } = UseAuth();
    const [imageUrl, setImageUrl] = useState('');
    const history = useHistory();
    // const generateQrCode = async (text) => {
    //     try {
    //           const response = await QRCode.toDataURL(text);
    //           setImageUrl(response);
    //     } catch (error) {
    //       console.log(error);
    //     }
    // }

    useEffect(() => {
        //generateQrCode(currentUser.uid);
        (async () => {
            try {
                const response = await QRCode.toDataURL(currentUser.uid);

                setImageUrl(response);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    function logoutHandler() {
        logout()
            .then(() => {
                history.push("/member/login");
            })
            .catch((e) => {
                alert("Çıkış yapılamadı lütfen tekrar deneyin! Sorun: " + e);
            });
    }

    return (
        <div className="container">
            <Helmet>
                <title>QR Kod Doğrulama - Boğaziçi Üniversitesi Bilişim Kulübü</title>
                <meta
                    name="description"
                    content="Boğaziçi Üniversitesi Bilişim Kulübü'ne kayıt adımlarınız yarım kalmış."
                />
            </Helmet>
            <h1>Compec'e kaydınız henüz tamamlanmamıştır. <a href="https://roundcube.boun.edu.tr" target="_blank">Roundcube</a> mail kutunuzu kontrol ediniz.</h1>
            <h3>Kayıt formunu doldurduğunuzda size gelmiş olan "" başlıklı e-mail'de yer alan linke tıklayarak e-mail adresinizi doğrulayabilirsiniz.</h3>
            <h4>Kaydınızı tamamlamak için tekrar form doldurmanıza gerek yoktur.</h4>
            {imageUrl ? (
                <a href={imageUrl} download>
                    <img src={imageUrl} alt="img" />
                </a>) : null}
            <div className="btn btn-primary" onClick={logoutHandler}>
                Çıkış Yap
            </div>
        </div>
    )
}

export default UnpaidReg;