// Unique variable name for Visa tool
  const vchkDataList = [
      { name: "KSA Visa", flag: "sa", url: "https://ksavisa.sa/?c=0" },
      { name: "Saudi Arabia (MOFA)", flag: "sa", url: "https://visa.mofa.gov.sa/VisaPerson/GetApplicantData" },
      { name: "Saudi Arabia (Portal)", flag: "sa", url: "https://visa.mofa.gov.sa/" },
      { name: "UAE", flag: "ae", url: "https://smart.gdrfad.gov.ae/Public_Th/StatusInquiry_New.aspx" },
      { name: "Malaysia", flag: "my", url: "https://malaysiavisa.imi.gov.my/evisa/check-evisa" },
      { name: "Oman", flag: "om", url: "https://evisa.rop.gov.om/en/track-your-application" },
      { name: "Qatar", flag: "qa", url: "https://portal.moi.gov.qa/wps/portal/MOIInternet/services/inquiries/visaservices/enquiryandprinting" },
      { name: "Kuwait (Enquiry)", flag: "kw", url: "https://rnt.moi.gov.kw/esrv/VisaStat.do?lang=eng" },
      { name: "Kuwait (eVisa)", flag: "kw", url: "https://e-visa-kuwait.com/visa-check-status" },
      { name: "Italy", flag: "it", url: "https://blsitalyvisa.com/senegal/page/track_application" },
      { name: "Singapore", flag: "sg", url: "https://service2.mom.gov.sg/workpass/enquiry/search" },
      { name: "USA", flag: "us", url: "https://ceac.state.gov/ceacstattracker/status.aspx" },
      { name: "France", flag: "fr", url: "https://www.atlys.com/tools/france-visa-status-checker" },
      { name: "Iraq", flag: "iq", url: "https://eservice.evisa.iq/" },
      { name: "Australia", flag: "au", url: "https://online.immi.gov.au/evo/firstParty" },
      { name: "Turkey", flag: "tr", url: "https://evisa.gov.tr/en/status/" },
      { name: "Greece", flag: "gr", url: "https://bd-gr.gvcworld.eu/en/what-is-the-status-of-my-visa-application" },
      { name: "New Zealand", flag: "nz", url: "https://nzeta.immigration.govt.nz/check-status" },
      { name: "Egypt", flag: "eg", url: "https://www.egyptianivisa.org/egypt-evisa-status-enquiry" },
      { name: "Denmark", flag: "dk", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/Ey/UM5rKPMuPWoM9so6dErw9MlQ/wjq9lJGkU959vsBvrOFDstsG0wBzADuf+qGXcEGxkEz8sbjc3mvJlPR49k=" },
      { name: "Albania", flag: "al", url: "https://consular.indonesianembassy.org.uk/check/trackvisa" },
      { name: "Indonesia", flag: "id", url: "https://consular.indonesianembassy.org.uk/check/trackvisa" },
      { name: "Lithuania", flag: "lt", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/BlZx7aT/DWezFVMeYX2hmCSlRWDIXclcabmR5zKiHoZVNKPNERmgyRABJaNCwx2aNZmzCtnJ5Bpf2LBrfP6k2X0Q1z2DPxJQm33rNuqa4Iv" },
      { name: "Cambodia", flag: "kh", url: "https://www.evisa.gov.kh/check_change" },
      { name: "Thailand", flag: "th", url: "https://thailand-e-visas.com/application-status/" },
      { name: "Vietnam", flag: "vn", url: "https://evisa.xuatnhapcanh.gov.vn/tra-cuu-thi-thuc" },
      { name: "Philippines", flag: "ph", url: "https://evisa.gov.ph/verifier" },
      { name: "Canada", flag: "ca", url: "https://services3.cic.gc.ca/ecas/authenticate.do" },
      { name: "Norway", flag: "no", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/MMWoQ2u/1NQd8ht0KuMDeqNJEBHzf/pf00e1uZwPSD2zYt8RkPOrijzqBSPrG6SpBLEnwcTgTEc55ZX0BXECrU=" },
      { name: "Sweden", flag: "se", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/A9+3ayKh2o6XUmXfdhngCYyU8AwlJS2teDiX9NGhCu5j7J2hGzy30dPAPM6bu3jEpSgRCiBikLlY7P5ZmCR3Qk=" },
      { name: "Switzerland", flag: "ch", url: "https://www.swiss-visa.ch/" },
      { name: "Netherlands", flag: "nl", url: "https://visatracking.vfsglobal.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/GAZMwphNakm2hstnNbT9MeLtMSNCgJ8GiT50RSS4w+IoAskZVw2rQ7iiIFWAOR5ntDOxlsmSQFg9knxElfrZWb0fOJES+KlD+VXNw0o9R+8" },
      { name: "Belgium", flag: "be", url: "https://infovisa.ibz.be/InfovisaNl.aspx" },
      { name: "Spain", flag: "es", url: "https://sutramiteconsular.maec.es/" },
      { name: "Germany", flag: "de", url: "https://videx.diplo.de/videx/visum-erfassung/en/videx-langfristiger-aufenthalt" },
      { name: "UK", flag: "gb", url: "https://www.gov.uk/visa-processing-times" },
      { name: "India", flag: "in", url: "https://www.passtrack.net/regular_passport.php" },
      { name: "Pakistan", flag: "pk", url: "https://visa.nadra.gov.pk/verify/" },
      { name: "Nepal", flag: "np", url: "https://nepaliport.immigration.gov.np/visa-check" },
      { name: "Sri Lanka", flag: "lk", url: "https://eta.gov.lk/etaslvisa/pages/checkStatus.jsp" },
      { name: "Bangladesh", flag: "bd", url: "https://www.bdvisa.com/track-your-application.html" },
      { name: "Japan", flag: "jp", url: "https://www.atlys.com/tools/japan-visa-status-checker" },
      { name: "Malaysia (US)", flag: "my", url: "https://ceac.state.gov/CEACStatTracker/Status.aspx?App=NIV" },
      { name: "France (Egypt Trip)", flag: "fr", url: "https://www.atlys.com/tools/france-visa-status-checker" },
      { name: "Maldives", flag: "mv", url: "https://www.immigration.gov.mv/visa/status" },
      { name: "Japan (Jeju Air)", flag: "jp", url: "https://www.atlys.com/tools/japan-visa-status-checker" },
      { name: "Bahrain", flag: "bh", url: "www.evisa.gov.bh/VISA/visaInput?nav=E01&E01=e" },
      { name: "Kenya", flag: "ke", url: "https://etakenya.go.ke/" },
      { name: "Ethiopia", flag: "et", url: "https://www.evisa.gov.et/visa-extension" },
      { name: "Ethiopia (EG)", flag: "et", url: "https://www.evisa.gov.et/#/checkstatus" },
      { name: "Iceland", flag: "is", url: "https://visa.government.is/" },
      { name: "Zambia", flag: "zm", url: "https://zambia-visa.com/application-status/" },
      { name: "Jordan", flag: "jo", url: "https://www.jsdbiz.com/jordan-visa/check-status" },
      { name: "Brazil", flag: "br", url: "https://formulario-mre.serpro.gov.br/sci/pages/web/ui/#/consultar-situacao" },
      { name: "China", flag: "cn", url: "https://www.visaforchina.cn/FRA3_EN/qianzhengyewu" },
      { name: "United Kingdom", flag: "gb", url: "https://atlantis-abs-uk.vfsglobal.com/track-status?missionCode=GBR&countryCode=bgd&lang=en" },
      { name: "South Africa", flag: "za", url: "https://www.vfsvisaonline.com/DHAOnlineTracking/OnlineTracking.aspx" },
      { name: "Russia", flag: "ru", url: "https://evisacheck.kdmid.ru/" },
      { name: "Mexico", flag: "mx", url: "https://ceac.state.gov/CEACStatTracker/Status.aspx?App=NIV" },
      { name: "Argentina", flag: "ar", url: "https://visatracking.vfsglobal.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/OVMz2fDVFo4HOHOD9+ZsS2aHQ5OzxnlPZonjofTOFmXYjYZNB/WcybRu22/pkuUnBnZFnpXvi+eqDV278ea0+cviut6qFkTvksiSXp49VJmi8S4ALf6edfaHHbBMlJkoQ==" },
      { name: "Egypt (Air Cairo)", flag: "eg", url: "https://www.egyptianivisa.org/egypt-evisa-status-enquiry" },
      { name: "South Korea South", flag: "kr", url: "https://www.visa.go.kr/openPage.do?MENU_ID=10301" },
      { name: "South Korea (Air Busan)", flag: "kr", url: "https://www.visa.go.kr/openPage.do?MENU_ID=10301" },
      { name: "South Korea (Korean Air)", flag: "kr", url: "https://www.visa.go.kr/openPage.do?MENU_ID=10301" },
      { name: "Nepal (Himalaya)", flag: "np", url: "https://nepaliport.immigration.gov.np/visa-check" },
      { name: "Hong Kong", flag: "hk", url: "https://www.gov.hk/en/residents/immigration/nonpermanent/appstatusenq.htm" },
      { name: "Bhutan", flag: "bt", url: "https://immi.gov.bt/track-application/" },
      { name: "Indonesia (Amadeus)", flag: "id", url: "https://consular.indonesianembassy.org.uk/check/trackvisa" },
      { name: "Brunei", flag: "bn", url: "https://ceac.state.gov/CEACStatTracker/Status.aspx?App=NIV" },
      { name: "Lebanon", flag: "lb", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/CQ1P0LBKn66dLdNUfueK+xykiaI75SBZmV+meEP0Shx+uY52hy40GYbxyEPSfVV0g==" },
      { name: "Lebanon (Air Arabia)", flag: "lb", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/CQ1P0LBKn66dLdNUfueK+xykiaI75SBZmV+meEP0Shx+uY52hy40GYbxyEPSfVV0g==" },
      { name: "Iraq (Jazeera)", flag: "iq", url: "https://evisatraveller.mfa.ir/en/request/status/" },
      { name: "Poland", flag: "pl", url: "https://www.lot.com/rs/en/journey/special-services/travel-documents/travel-poland" },
      { name: "Portugal", flag: "pt", url: "https://in-gr.gvcworld.eu/en/what-is-the-status-of-my-visa-application" },
      { name: "Morocco", flag: "ma", url: "https://www.acces-maroc.ma/#/" },
      { name: "Romania", flag: "ro", url: "https://eviza.mae.ro/checkvisasticker" },
      { name: "Taiwan", flag: "tw", url: "https://www.jsdbiz.com/taiwan-visa/check-status" },
      { name: "Nigeria", flag: "ng", url: "https://immigration.gov.ng/check-visa-status/" },
      { name: "Austria", flag: "at", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon%2Fx%2FB1eRfIlnOB2pWKLJ+6DYKyWgZoHLe2GNbJkZ93iyjEl6rOHB0%2Fcj6EXI40E2L+qrDDcWx6thm8IQSpoEhrPV5Y%3D" },
      { name: "Croatia", flag: "hr", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/LP5/hPag7COaFyhj+cLMlOg9lNxUTlJ+42mSIvhkjncyNlltInk2p6br8++WFRun6cSkO/+CjAWX4wQx/eUVBg=" },
      { name: "Finland", flag: "fi", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/K3TR28D6QZe7ZMQ849/GyMRu9oyBCGJ+NHqcGb/3GtVGbtnQ4WSUJQfYtSTvHun11+DkcDbTJUiJ8V2wuqc1Kk=" },
      { name: "Ireland", flag: "ie", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/KgjqpWLKpJv1+Cz1ga9/6EJfiYm1eKv4NloVE0HSGxAWwDd5VF9ztQ5srrLkyiWzIGvaqmiihvJ+fYFO3rrCDY=" },
      { name: "Colombia", flag: "co", url: "https://tramitesmre.cancilleria.gov.co/tramites/enlinea/consultarEstadoSolicitud.xhtml" },

      // নতুন যুক্ত করা দেশসমূহ
      { name: "Azerbaijan", flag: "az", url: "https://evisa.gov.az/en/check-status" },
      { name: "Georgia", flag: "ge", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/DeEEtn3ZhPEQYqzaKN/BsKSM/nm00Fis8ALFgXo4W8j+jiCvWBCuYHbampJnUCUIZTJpGTKOr/CwH627D3ueSc=" },
      { name: "Kazakhstan", flag: "kz", url: "https://www.vmp.gov.kz/en/services/visa-service" },
      { name: "Uzbekistan", flag: "uz", url: "https://e-visa.gov.uz/status" },
      { name: "Ukraine", flag: "ua", url: "https://evisa.mfa.gov.ua/" },
      { name: "Belarus", flag: "by", url: "https://visa.by/en/" },
      { name: "Serbia", flag: "rs", url: "https://www.evisawelcometoserbiagov.online/track-your-visa-application.php" },
      { name: "Bosnia and Herzegovina", flag: "ba", url: "https://bihembassygov.com/application-tracking/" },
      { name: "Montenegro", flag: "me", url: "https://evisa-gov.me/montenegro-visa-status-checker.html" },
      { name: "North Macedonia", flag: "mk", url: "https://evisa-gov.me/montenegro-visa-status-checker.html" },
      { name: "Bulgaria", flag: "bg", url: "https://visatracking.vfsglobal.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/AoKGAVyoVK/e8oAZk1pB9ed+n4cBnpujmSr+kOjjctvXM4q1Ljd0+2VRpM1gmxlg7swPiJ4N9yq1xcqMFsmkXk=" },
      { name: "Cyprus", flag: "cy", url: "https://visatracking.vfsglobal.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/Gf42uXe16FaHjaImDmi3NThsPkForn5Z0KgMyi+TRO/LgKgOeYhx9STbQ9Tu05ACIpVIq9IsbUcEEzzIkqZcxo=" },
      { name: "Malta", flag: "mt", url: "https://identita.gov.mt/central-visa-unit-services-visa-application-tracking/" },
      { name: "Slovakia", flag: "sk", url: "https://blsslovakiavisa.com/vietnam/track-application.php" },
      { name: "Slovenia", flag: "si", url: "https://svvmzz.adapta.si/statusnew.php" },
      { name: "Hungary", flag: "hu", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/FVWGkYuENF3aj/jI+9gY9pE83UEf2P6x9Sl8cvMqFf44wJKuUWVDH9Jtdz9xIMJdOsTyX1xa5hqsDlAXWW6bgaCacs7ghVCD/m/hX3R1bli" },
      { name: "Czech Republic", flag: "cz", url: "https://visatracking.vfsglobal.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/Jdf3aByYnqcjO/DruY4vPZfAMLbwkob13WiEvth/SSJfQ80KIaOztETUA08burPeR4P2J0qDrahwmCCZxPpk4WVr/NoFf/4JSJx33ePxMq4" },
      { name: "Latvia", flag: "lv", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/H4U4Yoxvegz1LFctYtWZRfI62JQCrj2NXrFipZADwMYWhmeoXqut6WKqRfOVcdxV84uSQ9PQpcGmZumtlL3TqQ=" },
      { name: "Estonia", flag: "ee", url: "https://visatracking.vfsglobal.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/CbH0A9wGBx658I5hrzrIX1gbnQaKHsBo/ZKbK61qsclzAGD3HS+9eeZitNQBHMmLSC2eA5W19fJFkwvEXpuzIw=" },
      { name: "Luxembourg", flag: "lu", url: "https://luxembourgvisacheck.com/verify-luxembourg-visa/" },
      { name: "Iran", flag: "ir", url: "https://evisatraveller.mfa.ir/en/request/status/" },
      { name: "Israel", flag: "il", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/E0nJ2YmLdPRwhIGpRxXn6XIAjxpzt2kVi+fwWg5R+RrqFTrFQAgsMnLxFfy23QVJFAiZIA0BbyUbFH9o/ukXH6CiYJWiv+OfCetxh/dwanY" },
      { name: "Ghana", flag: "gh", url: "https://www.ghana.gov.gh/find-application/" },
      { name: "South Sudan", flag: "ss", url: "https://www.evisa.gov.ss/" },
      { name: "Uganda", flag: "ug", url: "https://www.jsdbiz.com/uganda-visa/check-status" },
      { name: "Rwanda", flag: "rw", url: "https://irembo.gov.rw/user/citizen/service/rdb/tourism_and_travel/visa_and_permit" },
      { name: "Tanzania", flag: "tz", url: "https://visa.immigration.go.tz/checkapplicationstatus" },
      { name: "Mozambique", flag: "mz", url: "https://mnzonline.vfsevisa.com/moz/en/track-status" },
      { name: "Angola", flag: "ao", url: "https://www.jsdbiz.com/angola-visa/check-status" },
      { name: "Democratic Republic of Congo", flag: "cd", url: "https://congo-evisa.com/application-status/" },
      { name: "Congo (Republic of the)", flag: "cg", url: "https://congovisacheck.com/" },
      { name: "Gabon", flag: "ga", url: "https://evisa.dgdi.ga/#/check" },
      { name: "Cameroon", flag: "cm", url: "https://cameroon-visa.info/application-status/" },
      { name: "Senegal", flag: "sn", url: "https://visatracking.vfsglobal.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/MMWoQ2u/1NQd8ht0KuMDeqNJEBHzf/pf00e1uZwPSD2sHw7Ed+0eLzULaYh51OqLY73Hw1opL/fy3AJ9TC6LQM=" },
      { name: "Cote d'Ivoire", flag: "ci", url: "https://www.ivorycoastimmigration.org/check-status" },
      { name: "Fiji", flag: "fj", url: "https://www.vfsvisaonline.com/Global-Passporttracking/Track/Index?q=shSA0YnE4pLF9Xzwon/x/K3TR28D6QZe7ZMQ849/GyMRu9oyBCGJ+NHqcGb/3GtVjHzLqLb4jbd05jwMIb65+LszmBPTl5tEfBJ22L1R8eY=" },
      { name: "Papua New Guinea", flag: "pg", url: "https://evisa.ica.gov.pg/evisa/account/status" },
      { name: "Samoa", flag: "ws", url: "https://ws.usembassy.gov/visas/visa-information/" },
      { name: "Tonga", flag: "to", url: "https://www.tongaconsul.com/visa" },
      { name: "Vanuatu", flag: "vu", url: "https://visa.vfsglobal.com/vut/en/aus/track-application" },
      { name: "Solomon Islands", flag: "sb", url: "https://immigration.gov.sb/know-your-visa-requirements/" },
      { name: "Kenya", flag: "ke", url: "https://etakenya.go.ke/" }

  ];

  function openVchkModal() {
      setActiveMode('mode-vchk-tool');
      document.getElementById('vchkModalMain').style.display = 'flex';
      document.getElementById('vchkSearchInput').value = '';
      renderVchk(vchkDataList);
  }

  function closeVchkModal() {
      document.getElementById('vchkModalMain').style.display = 'none';
      document.getElementById('vchkSearchInput').value = '';
  }

  function renderVchk(data) {
      const grid = document.getElementById('vchkGridArea');
      grid.innerHTML = '';

      if (data.length === 0) {
          grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #ef4444; font-weight: bold; font-family: \'Inter\', sans-serif; font-size: 16px;">Sorry, no visa link found for this country!</p>';
          return;
      }

      data.forEach(item => {
          const card = document.createElement('a');
          card.href = item.url;
          card.target = '_blank';
          card.className = 'vchk-card';
          const flagImgSrc = item.flag === 'globe' ? 'https://upload.wikimedia.org/wikipedia/commons/2/22/Globe_icon.svg' : `https://flagcdn.com/w40/${item.flag}.png`;
          card.innerHTML = `
              <img src="${flagImgSrc}" alt="${item.name}">
              <span>${item.name}</span>
          `;
          grid.appendChild(card);
      });
  }

  function filterVchk() {
      const query = document.getElementById('vchkSearchInput').value.toLowerCase();
      const filtered = vchkDataList.filter(item => item.name.toLowerCase().includes(query));
      renderVchk(filtered);
  }
