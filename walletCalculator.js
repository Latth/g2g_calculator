const walletCalc = document.getElementById('walletCalc');

walletCalc.addEventListener('click', function () {
    const walletValue = document.getElementById('yourWallet').value;
    if (walletValue == "" || walletValue == null) {
        document.querySelector('#errorAndinfoWallet').innerHTML =
            `<span style="font-weight: bold; color: red;">LÜTFEN GEÇERLİ BİR FİYAT GİRİNİZ!</span>`;
        `Lütfen geçerli bir fiyat giriniz!`;
        setTimeout(function () {
            document.querySelector('#errorAndinfoWallet').innerHTML = `<span style="font-weight: bold;">Birden Fazla Satıştan Biriken Parayı Payoneer Kesintisi Hesaplanarak Banka Hesabınıza Gelecek Net Para Hesaplanır.</span>`;
        }, 3000);
    } else {
        let apiLink =
            `https://api.getgeoapi.com/v2/currency/convert?api_key=b7f8784b081fae6a7d05abca3696ae8f4fab6a35&from=USD&to=TRY&amount=${walletValue}&format=json`;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                let currentUSDwithFee = data.rates.TRY.rate - 0.30;
                let lastPriceTRY = (walletValue * currentUSDwithFee).toFixed(2);


                document.querySelector('#wallet-price-tl').innerHTML = lastPriceTRY;
            }
        };
        xhttp.open("GET", apiLink, true);
        xhttp.send();
    }


})