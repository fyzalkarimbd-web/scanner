var VS_YT_VIDEO_URL = "MfLlDGZTVuc";

  var VS_VALID_API_KEYS = [
    "VSLIP-84K9-M2XQ-71PA",
    "VSLIP-39R7-T5NZ-62BW",
    "VSLIP-76H2-W8CV-49DM",
    "VSLIP-52J4-P9YK-83EF",
    "VSLIP-18L6-B3RT-95GH",
    "VSLIP-64N8-D7UF-26JK",
    "VSLIP-91Q3-F4WX-58LM",
    "VSLIP-27S5-G6YZ-34NP",
    "VSLIP-45V1-H9AB-72QR",
    "VSLIP-77Z2-K8CD-17ST"
  ];

  var VS_API_STORAGE_KEY = "vslip_lifetime_api_key_v1";

  function extractVsYtId(input) {
    if (!input) return "";
    var s = String(input).trim();
    var m = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([a-zA-Z0-9_-]{11})/.exec(s);
    if (m && m[1]) return m[1];
    return s;
  }
