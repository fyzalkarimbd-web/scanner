const flightData =[
      { name: "Bangladesh", flag: "bd", url: "https://www.biman-airlines.com/#flight#check-in" },
      { name: "Saudi Arabia", flag: "sa", url: "https://www.saudia.com/en-SA/book-and-manage/manage/manage-booking" },
      { name: "Oman", flag: "om", url: "https://www.omanair.com/en/manage-bookings" },
      { name: "United Arab Emirates", flag: "ae", url: "https://www.emirates.com/english/manage-booking/online-check-in/" },
      { name: "Malaysia", flag: "my", url: "https://www.malaysiaairlines.com/hq/en/travel-info/check-in.html" },
      { name: "Malaysia (US)", flag: "my", url: "https://www.malaysiaairlines.com/us/en/travel-info/check-in.html" },
      { name: "Qatar", flag: "qa", url: "https://cki.qatarairways.com/cki/dashboard" },
      { name: "Kuwait", flag: "kw", url: "https://kuwaitairways.com/en/manage-booking" },
      { name: "Italy", flag: "it", url: "https://www.ita-airways.com/en_en/check-in-search.html" },
      { name: "Singapore", flag: "sg", url: "https://www.singaporeair.com/en_UK/sg/plan-travel/your-booking/managebooking/" },
      { name: "USA", flag: "us", url: "https://www.united.com/en/us" },
      { name: "France", flag: "fr", url: "https://wwws.airfrance.fr/en/check-in" },
      { name: "France (Egypt Trip)", flag: "fr", url: "https://wwws.airfrance.com.eg/trip" },
      { name: "Australia", flag: "au", url: "https://check-in.virginaustralia.com/checkin/index.html#/login" },
      { name: "Maldives", flag: "mv", url: "https://maldivian.aero/" },
      { name: "Japan", flag: "jp", url: "https://booking.flyairjapan.com/en/checkin" },
      { name: "Japan (Jeju Air)", flag: "jp", url: "https://wcc.jejuair.net/en/ibe/checkin/viewCheckin.do" },
      { name: "Bahrain", flag: "bh", url: "https://www.gulfair.com/flying-with-us/before-you-travel/manage" },
      { name: "Kenya", flag: "ke", url: "https://www.kenya-airways.com/en/book-manage/manage-booking/" },
      { name: "Vietnam", flag: "vn", url: "https://www.vietnamairlines.com/vn/en/travel-information/check-in/online-check-in" },
      { name: "Turkey", flag: "tr", url: "https://www.turkishairlines.com/en-us/tccmanagebooking/main.html" },
      { name: "Ethiopia", flag: "et", url: "https://www.ethiopianairlines.com/us/book/manage/manage-booking" },
      { name: "Ethiopia (EG)", flag: "et", url: "https://www.ethiopianairlines.com/eg/book/manage" },
      { name: "Iceland", flag: "is", url: "https://www.icelandair.com/support/pre-flight/manage-booking/" },
      { name: "Zambia", flag: "zm", url: "https://www.zambia-airways.com/" },
      { name: "Jordan", flag: "jo", url: "https://www.rj.com/en/plan-and-book/before-you-fly/book-your-ticket" },
      { name: "Spain", flag: "es", url: "https://www.iberia.com/us/booking/manage-booking/" },
      { name: "Germany", flag: "de", url: "https://www.lufthansa.com/jo/en/my-bookings" },
      { name: "Brazil", flag: "br", url: "https://www.latamairlines.com/us/en/latam-travel/manage-booking" },
      { name: "India", flag: "in", url: "https://www.airindia.com/content/air-india/in/en/manage/booking.html" },
      { name: "China", flag: "cn", url: "https://www.airchina.com.cn/en/index/managebooking" },
      { name: "Canada", flag: "ca", url: "https://www.aircanada.com/us/en/aco/home/book/manage-reservation.html" },
      { name: "United Kingdom", flag: "gb", url: "https://www.britishairways.com/travel/manage-your-booking/public/en_us" },
      { name: "South Africa", flag: "za", url: "https://www.flysaa.com/gb/en/book-manage/your-booking" },
      { name: "Russia", flag: "ru", url: "https://www.aeroflot.ru/ru-en/menu/check-in" },
      { name: "Mexico", flag: "mx", url: "https://www.aeromexico.com/en-us/travel-resources/manage-my-trip" },
      { name: "Argentina", flag: "ar", url: "https://www.aerolineas.com.ar/en/manage-booking" },
      { name: "Thailand", flag: "th", url: "https://www.thaiairways.com/en_SA/Manage_My_Booking/My_Booking.page" },
      { name: "Egypt", flag: "eg", url: "https://digital.egyptair.com/ssci/identification" },
      { name: "Egypt (Air Cairo)", flag: "eg", url: "https://aircairo.com/en-gl/my-booking" },
      { name: "South Korea", flag: "kr", url: "https://flyairseoul.com/I/en/viewCheckInList.do" },
      { name: "South Korea (Air Busan)", flag: "kr", url: "https://en.airbusan.com/web/individual/reserve/index" },
      { name: "South Korea (Korean Air)", flag: "kr", url: "https://www.koreanair.com/?hl=en" },
      { name: "Nepal", flag: "np", url: "https://www.nepalairlines.com.np/manage-booking/" },
      { name: "Nepal (Himalaya)", flag: "np", url: "https://www.himalaya-airlines.com/" },
      { name: "Hong Kong", flag: "hk", url: "https://www.cathaypacific.com/cx/en_HK/book-manage/manage-your-booking.html" },
      { name: "Bhutan", flag: "bt", url: "https://www.drukair.com.bt/manage-your-booking/" },
      { name: "Sri Lanka", flag: "lk", url: "https://www.srilankaairlines.com/book/manage-booking" },
      { name: "Philippines", flag: "ph", url: "https://www.philippineairlines.com/us/en/manage-booking.html" },
      { name: "Indonesia", flag: "id", url: "https://www.garuda-indonesia.com/sg/en" },
      { name: "Indonesia (Amadeus)", flag: "id", url: "https://checkin.si.amadeus.net/1ASIHSSCWEBGA/sscwga/checkin?ln=en" },
      { name: "Brunei", flag: "bn", url: "https://www.flyroyalbrunei.com/brunei/en/book-manage/online-check-in/" },
      { name: "Lebanon", flag: "lb", url: "https://www.beirutairport.gov.lb/_flight.php" },
      { name: "Lebanon (Air Arabia)", flag: "lb", url: "https://webcheckin.airarabia.com/accelaero/en/index.html#/en" },
      { name: "Pakistan", flag: "pk", url: "https://www.piac.com.pk/" },
      { name: "Iraq", flag: "iq", url: "https://www.ixigo.com/airlines/iraqi_airways-ia/flight-status" },
      { name: "Iraq (Jazeera)", flag: "iq", url: "https://www.jazeeraairways.com/en-bd?#check-in" },
      { name: "Netherlands", flag: "nl", url: "https://www.klm.com/check-in" },
      { name: "Switzerland", flag: "ch", url: "https://www.swiss.com/gb/en/fly/check-in/online-check-in.html" },
      { name: "Sweden", flag: "se", url: "https://www.flysas.com/en/checkin" },
      { name: "Denmark", flag: "dk", url: "https://dat.dk/en/online-check-in/" },
      { name: "Poland", flag: "pl", url: "https://www.lot.com/pl/en/manage-booking/overview" },
      { name: "Portugal", flag: "pt", url: "https://www.flytap.com/en-dk/check-in-information" },
      { name: "Greece", flag: "gr", url: "https://en.aegeanair.com/plan/manage-booking/" },
      { name: "New Zealand", flag: "nz", url: "https://flightbookings.airnewzealand.com/vmanage/actions/retrieve/webcheck" },
      { name: "Morocco", flag: "ma", url: "https://www.royalairmaroc.com/us-en/booking/online-check-in" },
      { name: "Romania", flag: "ro", url: "https://digital.tarom.ro/ssci/identification?lang=ro-RO" }, // TAROM Airlines
      { name: "Taiwan", flag: "tw", url: "https://booking.evaair.com/flyeva/eva/b2c/manage-your-trip/online-checked-in-login.aspx?lang=en-global" }, // EVA Air
      { name: "Nigeria", flag: "ng", url: "https://flyairpeace.com/" },
      { name: "Austria", flag: "at", url: "https://www.austrian.com/us/en/online-check-in" }, // Austrian Airlines
      { name: "Belgium", flag: "be", url: "https://www.brusselsairlines.com/be/en/check-in-options-and-info/online-check-in-options.html" }, // Brussels Airlines
      { name: "Croatia", flag: "hr", url: "https://wci.croatiaairlines.hr/web/ck_retrieve?langCode=en" }, // Croatia Airlines
      { name: "Finland", flag: "fi", url: "https://www.finnair.com/en/check-in" },
      { name: "Ireland", flag: "ie", url: "https://www.aerlingus.com/html/en-US/home.html" }, // Aer Lingus
      { name: "Colombia", flag: "co", url: "https://checkinnew.avianca.com/Check-In?lang=En" } // Avianca
  ];

  function openFlightModal() {
      setActiveMode('mode-flight-check');
      document.getElementById('flightModal').style.display = 'flex';
      document.getElementById('flightSearchInput').value = ''; // Clear search box
      renderFlights(flightData); // Render all cards initially
  }

  function closeFlightModal() {
      document.getElementById('flightModal').style.display = 'none';
      document.getElementById('flightSearchInput').value = '';
  }

  function renderFlights(data) {
      const grid = document.getElementById('flightGrid');
      grid.innerHTML = '';
      
      if(data.length === 0) {
          grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #ef4444; font-weight: bold; font-family: \'Inter\', sans-serif; font-size: 16px;">Sorry, no country found with this name!</p>';
          return;
      }

      data.forEach(item => {
          const card = document.createElement('a');
          card.href = item.url;
          card.target = '_blank';
          card.className = 'flight-card';
          card.innerHTML = `
              <img src="https://flagcdn.com/w40/${item.flag}.png" alt="${item.name}">
              <span>${item.name}</span>
          `;
          grid.appendChild(card);
      });
  }

  function filterFlights() {
      const query = document.getElementById('flightSearchInput').value.toLowerCase();
      const filtered = flightData.filter(item => item.name.toLowerCase().includes(query));
      renderFlights(filtered);
  }
