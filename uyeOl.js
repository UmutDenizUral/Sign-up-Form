
let formUlkeDom = document.querySelector('#ulkeDom'),
    formilDom = document.querySelector('#ilDom'),
    formilceDom = document.querySelector('#ilceDom'),
    formBtnDom = document.querySelector('#btnDom'),
    formKadiDom = document.querySelector('#kadiDom'),
    formSifreDom = document.querySelector('#sifreDom'),
    formDom = document.querySelector('#formKayitDom')

//Datandan lokasyonların çekilmesi
fetch('lokasyon.json') //Json Data import edildi
    .then(response => response.json()) //Json data js versiyonuna dönüştürdü 
    .then(veriLokasyon => {
        veri = veriLokasyon
        for (let i = 0; i < veri.ulke.length; i++) {
            formUlkeDom.innerHTML += `<option value=${veri.ulke[i]}>${upperFirstL(veri.ulke[i])}</option>` //ülkeleri forma eklemek
        }
    })
//ulke seçilince  il  bilgisi gelicek
formUlkeDom.addEventListener('change', function () {
    formilDom.innerHTML = `<option disabled selected>İl Seçiniz</option>`
    formilceDom.innerHTML = `<option disabled selected>İlçe Seçiniz</option>`
    ilDataGir(formUlkeDom.value.toLowerCase())    // il bilgisi forma eklendi
})
//il seçilince ilce bilgisi gelecek
formilDom.addEventListener('change', function () {
    ilceDataGir(formilDom.value.toLowerCase())    // ilce bilgisi forma eklendi
})
// il biligsini databaseden çekip forma ekleme fonksiyonu
function ilDataGir(ulke) {
    formilDom.innerHTML = `<option disabled selected>İl Seçiniz</option>`
    for (let i = 0; i < veri[ulke].iller.length; i++) {
        formilDom.innerHTML += `<option value=${veri[ulke].iller[i]}>${upperFirstL(veri[ulke].iller[i])}</option>`
    }
}
// ilce biligsini databaseden çekip forma ekleme fonksiyonu
function ilceDataGir(il) {
    formilceDom.innerHTML = `<option disabled selected>İlçe Seçiniz</option>` // form seçenekleri temizler 
    for (let i = 0; i < veri.iller[il].ilce.length; i++)
        formilceDom.innerHTML += `<option value=${veri.iller[il].ilce[i]}>${upperFirstL(veri.iller[il].ilce[i])}</option>`
}
// İlk harfi büyük yazdıran fonksiyon
function upperFirstL(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);        
}
////  Kayıt kısmı kısmı

//submit ile local storage kayit işlemi
formKayitDom.addEventListener('submit', function (event) {
    event.preventDefault()
    let userNo = parseInt(localStorage.getItem('userNo')) || 0; // Değer varsa al yoksa 0 yaz.
    userNo++
    kadi = formKadiDom.value
    sifre = formSifreDom.value
    ulke = formUlkeDom.value
    il = formilDom.value
    ilce = formilceDom.value
    veriGonder(userNo, kadi, sifre, ulke, il, ilce)
    localStorage.setItem('userNo', JSON.stringify(userNo))
    alert('Kayıt Başarılı')
})
function veriGonder(userNo, kadi, sifre, ulke, il, ilce) {
    data = { kadi: kadi, sifre: sifre, ulke: ulke, il: il, ilce: ilce }
    localStorage.setItem(`user${JSON.stringify(userNo)}`, JSON.stringify(data))
}






