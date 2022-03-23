        let calculate = document.querySelector('#calculate');

        calculate.addEventListener('click', function () {
            let price = document.querySelector('#yourPrice').value;
            if (price == "" || price == null) {
                document.querySelector('#errorAndinfo').innerHTML =
                    `<span style="font-weight: bold; color: red;">LÜTFEN GEÇERLİ BİR FİYAT GİRİNİZ!</span>`;
                `Lütfen geçerli bir fiyat giriniz!`;
                setTimeout(function () {
                    document.querySelector('#errorAndinfo').innerHTML = `<span style="font-weight: bold;">USD Hesaplaması Payooner Kesintisi olmadan
                    yapılmıştır! TRY Hesabı güncel TRY kârını gösterir.</span>`;
                }, 3000);
            } else {
                let fee1 = price * 0.1;
                let pr1 = price - fee1;
                let fee2 = pr1 - 2.99;
                let fee3 = fee2 * 0.04;
                let pr2 = Math.floor(fee2 - fee3);

                console.log(pr2)

                let apiLink =
                    `https://api.getgeoapi.com/v2/currency/convert?api_key=b7f8784b081fae6a7d05abca3696ae8f4fab6a35&from=USD&to=TRY&amount=${pr2}&format=json`;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        let data = JSON.parse(this.responseText);
                        let currentUSDwithFee = data.rates.TRY.rate - 0.30;
                        console.log(currentUSDwithFee)
                        let lastPriceTRY = pr2 * currentUSDwithFee;


                        document.querySelector('#last-price-tl').innerHTML = lastPriceTRY;
                        document.querySelector('#last-price-usd').innerHTML = pr2;
                    }
                };
                xhttp.open("GET", apiLink, true);
                xhttp.send();
            }
        })