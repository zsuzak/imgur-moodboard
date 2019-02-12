let settings = {
    "url": "https://api.imgur.com/3/album/itw8iMo/images",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Authorization": "Client-ID cd2346e46dd2bdc"
    },
};

let imgs = [];
let counter = 0; 
$.ajax(settings).done( (response) => {
    let j = 0;
    for (let i = response.data.length - 1; i >= 0; i--) {
        imgs[j] = response.data[i].link;
        j++;
    }

    for (let i = 0; i < 20; i++) {
        if(i % 2 === 0) {
            $('.left').append(`<img id="lefty" src="${imgs[i]}" />`);
        }
        else {
            $('.right').append(`<img id="righty" src="${imgs[i]}" />`);
        }
        counter = i + 1;
    }
    console.log(counter);
});


$(window).scroll(() => {
    if($(window).scrollTop() + $(window).height() == $(document).height() && counter < imgs.length) {
        let ub = counter + 10;
        for (counter; (counter <= ub) && (counter < imgs.length) ; counter++) {

            if (counter % 2 === 0) {
                $('.left').append(`<img id="gridEl" src="${imgs[counter]}" />`);
            }

            else {
                $('.right').append(`<img id="gridEl" src="${imgs[counter]}" />`);
            }
            console.log(counter);
        }
    }
 });