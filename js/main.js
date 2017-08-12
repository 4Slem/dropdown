var LIST = [
    {
        city: 'Lviv',
        population: '727968'
    },
    {
        city: 'Kyiv',
        population: '2906569'
    },
    {
        city: 'Paris',
        population: '2220445'
    },
    {
        city: 'Odesa',
        population: '1010848'
    },
    {
        city: 'Ternopil',
        population: '218022'
    },
    {
        city: 'Sidney',
        population: '3908643'
    }
];

window.onload = function() {
    var doc = document;
    var dropdownItems = doc.getElementsByClassName('dropdown__items');
    var dropdownItem = doc.getElementsByClassName('dropdown__item');
    var searchInput = doc.getElementsByClassName('search__input')[0];
    var dropdownSelected = doc.getElementsByClassName('dropdown__selected')[0];
    var items = doc.getElementsByClassName('dropdown__items')[0];
    var dataOLD = LIST.length;
    var data = [];
    var dataLen;

    var Dropdown = {
        data: function () {
            for(var i = 0; i < dataOLD; i ++) {
                if(LIST[i].population > 1000000) {
                    data.push(LIST[i]);
                }
                else {
                    console.log(LIST[i].population)
                }
            }
            dataLen = data.length;
            
        },

        open: function () {
            this.classList.toggle('dropdown__open');
            this.nextElementSibling.classList.toggle('dropdown__open');
            searchInput.value = "";
            Dropdown.search();
        },

        select: function (target) {
            var size = dropdownItem.length;
            for(var i = 0; i < size; i ++) {
                dropdownItem[i].classList.remove('dropdown__item_open');
            }
            target.classList.add('dropdown__item_open');
            var value = target.firstElementChild.innerHTML;
            searchInput.value = "";
            dropdownSelected.innerHTML = value;
            target.parentElement.classList.remove('dropdown__open');
            target.parentElement.previousElementSibling.classList.remove('dropdown__open');
            Dropdown.search();
        },

        init: function () {
            Dropdown.data();
            var itemWrap = dropdownItems[0];
            for(var i  = 0; i < dataLen; i++) {
                var item = doc.createElement('div');
                var itemCity = doc.createElement('div');
                itemCity.innerHTML = data[i].city;
                var itemPopulation = doc.createElement('div');
                itemPopulation.innerHTML = ', населення ' + Math.round((data[i].population / 1000000)*10)/10 + ' млн';
                item.className = "dropdown__item";
                itemCity.className = "dropdown__item_city";
                itemPopulation.className = "dropdown__item_population";
                item.appendChild(itemCity);
                item.appendChild(itemPopulation);
                itemWrap.appendChild(item);
            }
        },

        search: function () {
            for(var i  = 0; i < dataLen; i++) {
                var hide = dropdownItem[i];
                hide.classList.add('hide');
                var stringOne = data[i].city;
                stringOne = stringOne.toLowerCase();
                var str = searchInput.value;
                var wheresWaldo = stringOne.indexOf(str.toLowerCase());
                if(wheresWaldo >= 0) {
                    hide = dropdownItem[i];
                    hide.classList.remove('hide');   
                }
            }
        }
    }

    Dropdown.init();

    searchInput.oninput = function () {        
        Dropdown.search();
    }

    dropdownSelected.addEventListener("click", Dropdown.open, false);

    items.onclick = function(event) {
        var target = event.target;
        while (target != items) {
        if (target.classList.contains('dropdown__item')) {
          Dropdown.select(target);
          return;
        }
        target = target.parentNode;
      }
    };




    document.body.onclick = function (e) {
        e = e || event;
        target = e.target || e.srcElement;
        if ((!(target.classList.contains('dropdown__selected')) && !(target.classList.contains('search__input'))) && dropdownSelected.classList.contains('dropdown__open')) {
            items.classList.toggle('dropdown__open');
            dropdownSelected.classList.toggle('dropdown__open');
        }
    }







}