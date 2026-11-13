function openHighwayPoliceModal() {
      if (typeof setActiveMode === 'function') setActiveMode('mode-highway-police'); // বাটন হাইলাইট করবে
      window.open('https://map.highwaypolice.gov.bd/', '_blank'); // সরাসরি অফিশিয়াল সাইটে নিয়ে যাবে
  }
