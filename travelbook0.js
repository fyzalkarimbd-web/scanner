const travelData = {
    airline: [
        { name: "Air Astra - Airways Limited", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzFwE1JacbyZYGxfFGlgrAzNHpcHIC3cGStp3sFdzQExU3t_SbY7TAKf_nu-NjAkHsAFnKzOfQ2Eb7EjMfYzNpt1tVARx9KcArP0KTLkgJ18XmszIWPtP72q_qyzD-CUP3aCwU9jgpXAdCc4kHip_WDbbdfJGJrW4TNHGdvuEirE476SmL5YunKaBbyGk/s310/airastra.jpeg", url: "https://airastra.com/" },
        { name: "NovoAir - Flight journey", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmCdx87khpWyigXErtMmgY3pCa0eLX7TujrfpJirNlUWDXLviPS3mBE3WR-O2PTffw35SE9Te5aNV9bMj7oODetlxpPd25xgfs-JMMCjQD_Lj8ZEqsPd-Y_b8FhzNAIzBvMFMlrbeBFZ4YJRx0H9kKwm3n5cA3wHpU-_l5w_oqZJib5jXh6L4v5G_3u6M/s282/novoair.jpeg", url: "https://www.flynovoair.com/" },
        { name: "CheapOair - Flight Tickets", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdBeTFWZoK078de1HgMF6-SUsDaCXWwRCc_X1eMiKinq9RL30OvnESoSdRgwmuF5gOMqYNZ5slqcZfAg1wwAp3hid8lhQxaZ6JbgcvWHXOjy3SHtSE0uGs0Nl-oasjxQNikJ3DDBSeMARhPBnmcoynxZaOf06TTP9hhO_65qzLcC8PrPzPSlL9CK8IVrI/s280/cheapoair.jpeg", url: "https://www.cheapoair.com/" },
        { name: "Bangladesh Biman Airlines", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFBygpOUNHZd6oZF1cELJFQcYZrQyZXqFdQXTg1b1tef2NPW3AxTGB8nAgqcVG25Zx8TU6N7oxE_SBIWl141QVEWsx9XtF2wA5wg9i2MqFs4MQCEEABYZMbsu18MCguaVSIFg6wYtWsIBYKs-KvZF1MQWfQt6zaFcZpkDW5KO8mFoLyxWSCwuXpqkFATo/s301/hsia.jpeg", url: "https://www.hsia.gov.bd/bn/" },
        { name: "OneTravel - Flights & Tickets", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjiIp1CXwAMFZnngeZ4cYTnIt7wbH5-1rKzUI-FOChONcdpFu4pC1Hw95cyI7XYTBtHPj75GojeSCRNwAM4m5DHLQuHzlBk0WfMHZkNxfkB18zNaxoXdh6aL0_3aoNESjxKk1QzWVxtaONY5gF3_VV-jcfTpTPKcGgNkVHXEp79Vr-ZEmDtBZErN8AdOF8/s300/onetravel.jpeg", url: "https://www.onetravel.com/" },
        { name: "Trips Insider - Air Ticket", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEis30Ww8khsAtOYGvq-sJtGkr2oMs6plzmy30qK2Cg-8haqTeS7ZXghzVQ6QZoaFWTxKlSj7zrC7Pxpa_U9jxThFxj02vu_IaFHqXuWEoXcYBwHuB_XCURdfur9GeNnJBM_WS3bj2wfgj_0HjURUh2QYd20BxTXXzLA8NpXS85sKrCBuIeUrDcWc3ZK7Vs/s299/tripsinsider.jpeg", url: "https://www.tripsinsider.com/flights/" },
        { name: "Flight Fare - Ticket Bangladesh", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjMo5RPw8fmeiruDpAFlHSItavRqG7oAwdfaUpoS04i1lN0HGLn_OBoaTW569j2sJjKx_S84G0ym3_0CIjax-BdU7qh-T57lyskttzztWaRke0QhhekclTFZJoR9hJilm_HwMKccnLuDoXL22uQgOTBsHp1usMLxZc3uWhnSbquieDWRG1Me305sOrI27Y/s298/flight-fare.jpeg", url: "https://www.flight-fare.com/" },
        { name: "Shohoz - Air Tickets", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6-YOiojE9oOsZIYy9inW1J0iv3sS8lL5diptKtFW1x2bE2ZV5QlHLV2oBKr4ucXtkg2SHH9k5upQzIm0ZhMkGdXukUUENc5Td_OCP5Ec5H_M43ZskW6pd4F7Ux6Evnzj8e-6M6wJFKwelKEiguIU1QmyZa-dwF6_9X7j87VVJRksTy8W4hKIbD_IPtuQ/s300/shohoz.jpeg", url: "https://www.shohoz.com/air-tickets" },
        { name: "US-Bangla Airlines", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLDIS9PBmqJVLytVi7xNwUUpE1pKXvvRqWDz1uo8WEKQOrXdZFMcqtSxiNfZufUkH5beF3l3GJkc1MrKzq3rA-eGj6QtKEgA2ZMo_GcthwK84SFhHZmCkfyKu41AAAW9Tjxy_Ibfaq3X10S-7TKYK9nlkBCfThSVbmvidm1OPMGKJhBbG6tmqRilN6ZJk/s180/usbair.jpeg", url: "https://usbair.com/" },
        { name: "Biman Bangladesh Airlines", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgx2zt7gC9GxQiXxDnk1jjcy225VjMuKVdLpJakdKnafkYwBautVNlZ1XLNX5R1b6e9kHfHh3VV9FE3VtHOp2y5K4TXUfeKz-8OY7mz4uQLchCcE8__WHPIoexLztlNJSNqQ5SKqSdofQL0uX0J2LQndh39hCfdFK9hZrY3iAW-NPnDN-kgPFOR4QUlBps/s208/biman-airlines.jpeg", url: "https://www.biman-airlines.com/" },
        { name: "Buy Tickets BD", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjlaUNTVCv_7H0Cqt5O15tbLfy27iBBVTtcpOJ4V_dfmukM1ByTCKg_s8NJ4KmZYJcwfZ5p-tUNkVF7BUg4w5X-BDNEZicNja6OLLwAb-C5ovYFBBvUXas1WEWRTQsrlNqdpJP81DwpPvKgqwrkEXWseOJYQFlGFpvRyeEwLXg6OyBzdnNSJIZdeK2Fiz8/s256/buytickets.jpeg", url: "https://buytickets.com.bd/" },
        { name: "Amy Travel Agency", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtswuB4Rzm-FPOJmoD-q-JfaHMXni3NU2rg6_0VuOsga6ddAP8zCsPMnvB3LaUKL35SCaom4Pg42Po8z8JtI9pVv9nr5Z5c0_9GyQLzhcR3aiGBF93tmycLCHj1M6Nd1yuecPaKWbglLBpn9J6Xn_HlFRgJshcDJzJ_HxW8nWPdDrjz0YLZf4Hy5GY1Hw/s605/amy.jpeg", url: "https://www.amybd.com/" },
        { name: "Firsttrip - Flight Booking", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEilY131MwEU9OziE6aO2japzvY0UtXasuJ8oPOeRXa_Em4MKsbXQJAsUGJAfD7DeZuHH_XiyesjbnxdTF2OX3fCvdJnEV-tKm_wq2oZTajp-fYY4pUZZaDECYhcI85loxnO5XKEvuh3Bysw4RWVH9K7gf8Brsg1TBSMFFxQMwwlYnkgr1MYDQhA2uBXxaY/s494/firsttrip.jpeg", url: "https://firsttrip.com/" },
        { name: "GoZayaan Travel", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEifWUi0ebKglTSr6lXMXSHmvXP3q62xJ-CvvnDikM5emQVPybzf0fA-nFmKAb4uqf9X4zd5Qux3fxnBNu9hrPxthyphenhyphenXQOI7sc55ejOM5KF7fzxWX_dP0kX80-Ls707TXV-XjWmqOQCcu70vKkjIIUmpaz7u3fmNvPdXBFzmuIVO4tg7frFtd6HmGJGQMETA/s130/gozayaan.jpeg", url: "https://gozayaan.com/" },
        { name: "Airpaz - Traveling", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi11IN9cCtfiUcC4VTZ29mGIulxAG4TLWwKIodNcPkmG5P-iNZFejbLECtEKRJF4f-LtsZu3X-4GEDLVhRzwB3RdA3mqssL34kUaMGZC2LlqpmgmwyxaviWZwRXBC0uw-PWImkoDjBskcnk1dfPoAcPC5mY5Gg1RajBZompYAYo82h5NbuBxzHU4KjzM5A/s140/airpaz.png", url: "https://www.airpaz.com/" },
        { name: "ShareTrip - Air Tickets", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0NOdrWQEVXv7y_5zQljA9j21ieRiyjxWlrJaWC5YdoD1JkzePW2HOSg79WEFortmh6sNhpd7SRQGDniDlPb9pyb-GDGOKv0A1YRcXlqopbPHcwVZK0K8Z8h0tQEg2ANFKWjkAeemd7ifYa1kdk1SikwKSKX2jQPEjc0VBE7tv1nusYCeCSpMwV3ZET64/s568/sharetrip.jpeg", url: "https://sharetrip.net/" }
    ],
    bus: [
        { name: "Jatri - Bus Tickets", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2jOMe7fIgGFZQF7rz9B4kGYd71gFVmsUYMDUYVHa2daMP5Y5GHu2mNI_Ns0S-XBiQMf-z0MNZ-sCKGsaEa1eCmh5qIKvq91-7-MVQDikXpAGCHOsQhhT1Yhv00HskGBhLWwcTACKFOxxcjXbVagPrC5IuJpuQTKYG-8DAuO2s3zk37xZOvrvT4hEulVM/s72/jatri.jpeg", url: "https://jatri.co/" },
        { name: "BdTickets", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4rj1LljIDCXWGKxsQq1rshi9PrmhT3-bEIHwELuEF5-XbLhD4aEPTwcM_MngUzcXaWdnylrUzGHjvW8FLINCQdbAb-TUmC7ZEFPZVOO9tUgCOX8Hc-vPFSKZE_kmoJWwNDf2uhwwqnuu2MeKVO27otb7qnSIfuT-JaK_iIeMrDo6Z52yW9Ts6VdjtJqM/s384/bdtickets.jpeg", url: "https://bdtickets.com/" },
        { name: "Shohoz - Bus Tickets", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6-YOiojE9oOsZIYy9inW1J0iv3sS8lL5diptKtFW1x2bE2ZV5QlHLV2oBKr4ucXtkg2SHH9k5upQzIm0ZhMkGdXukUUENc5Td_OCP5Ec5H_M43ZskW6pd4F7Ux6Evnzj8e-6M6wJFKwelKEiguIU1QmyZa-dwF6_9X7j87VVJRksTy8W4hKIbD_IPtuQ/s300/shohoz.jpeg", url: "https://www.shohoz.com/bus-tickets" },
        { name: "Busbd - Tickets Online", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRile9ABFI4-9lV2oLolGu85XXHl5D34FCr7lbD6-5oAd1Nk969fDvBHrutrpiPcQ0P2k4LlzDpctuyOyuAKlZOReDk3L03L0NPKM7HcZjZ-cu8WfAOpGTkNWcBRFpBjCn-QN0bHzQsD3SfNJYKL8qrMzbmjT3ATJwc_VYc746bQSmrwcvSupDQXYKRjI/s118/busbd.jpeg", url: "https://www.busbd.com.bd/" },
        { name: "Green Line – E-ticketing", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgre2Shmq2gWKs5sEp-aXh-zlkk-NqbLpBbjRjGCWnsaJMnaqqQZIg5zSLBE-J1cWajtivhZe-06QnMqUaWgnx2y67zTPAdREUoTBvXYqZDMhi4BH-lFmAHj8PrESGL1BHOTZB7IGhIIylgvQREjSPjAP9jh6PCZ1imxx-yiod7hv91dRLwOt_U7Ekt66U/s332/greenlinebd.png", url: "https://greenlinebd.com/" },
        { name: "Hanif Enterprise", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9z7-GH0VJC0GFVfq4PyJ79axGfwf_40h_8LEU-KiMDxaKuYi-tyTUhMQqzU6CHQZvJGnYTyhqcRu_HJ_V7ScAUmE5d003g031dumwyUEH-FlS9nujkNwILxeacMrmIcbFmEdnWV4ABaiCIQ0Er5-K13uBo1g1_GjrbSKJXY-T9y2AXzlDccSsVxa2QEk/s600/hanif.jpeg", url: "https://www.hanifenterprisebd.com/" },
        { name: "S-Alam - Online Bus Ticket", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhW4DjoagK_DMcIi_k2EQPETNBQ0HOpXg4MLYtzKirvOtREe12Oj1x4XHaU8peQxutAjWhuiPfjAP_BwqenX6wUthif8xgmHlLAZtHh52cKLpM1w0E7QEqHAHAbXHin-rt-fAQvkIB16x9-91iyvuzvPzr8BeqG3panbQ1QT3RP1efZOKqhnbvu2zbMUYM/s160/s-alambus.jpg", url: "https://s-alambus.com/" },
        { name: "Shyamoli Paribahan", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgFOnwIs_g29y-bVAqVSYgxOmucraz7QsXP_z9ZJIUtO7aBbyW_mgnIui7vy_4uUgoUvvW0DfGmRjxcJhtrP92pV8kS7ZK4k9Gw2lF6j2qom8TByf-MQOknIIZ9eYytfNOHlzviFHAhmYd5wPLES136JyMUZev_oxYYQO4RG4WzCS8-v3ZtVO_8RYWqxZc/s400/shyamoliparibahan.jpeg", url: "https://shyamolitickets.com/" },
        { name: "National Travels", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8-U2juN1vbAIzy1GR3jVP6Zan80BX63YJBSL1iZtcITAmuY7ppwovjOOSJz689zKabdQ-cuttwd1n6JNgULuxN4eQTKxuL1p8F8NGGaRdzz7ur9WEygkZ7AwMa0nY0z8lx8bsPwI8TAgZ7rMflnSriyelruPeaVc77OrFcV-8-NoBcg5NRAfwHfIe7-0/s336/nationaltravels.jpeg", url: "https://www.nationaltravels-bd.com/" },
        { name: "Shohagh Paribahan", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOBbOgDcSH_mpk2U7xLzbqjh2by5JLmuLReysuEnDMGkXJU-50OV6HdmG8flwg_gDFIYuIZsvcjUkYy9JskjkG4ZOYtGZs8pARu9WXXy5d2lw-SXA1Z8MdU2XwyZKSELmEg4lGX1i_RQYFyxvY5n7SOS7hkDEfUI65p54rrYYYgPTKcpc5E5mbDOYPJoc/s1366/shohagh.png", url: "https://shohagh.com/" },
        { name: "Chapai Express", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhEwO0jSzYF2DQxoHdQuF9Ps1LiDTg0QEpH0l6GXYYE_mkI6ASMYTq_D_TEuhzSzhlZhCDp6J9w-mGaGOxpBaVm54uLI0Ma8nqYHxkaQGAHnD83OxksY-Z9U94hxgGlzceXcfXmXpXsCAtmGPUD7_OcjqK-FwCZLTM-KKfK-vPd5avf5PsP8vTjlOjL2Jk/s211/chapaiexpressbd.jpg", url: "https://chapaiexpressbd.com/" },
        { name: "Grameen Travels", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi629AEP8pdiHZ5ucQLNlKVbtb7TfynFIKx8QIIXUTagDLppBp7VIJs4GTvwyJHvLc5DqBDaa8zxYjid-d5o-2YU9mUO9YnnwxRkePVUxgvYdbtlnmXkEac-OINQUBqu7jdBUyOh_72rAutYSeLV69ozyoSLnp2nHGunzV4VnhnudpThKSN-k13ugSzaak/s350/grameentravels.jpg", url: "https://grameentravelsbd.com/" },
        { name: "Ena Transport", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjGmlE-en2rk-y5VMqTGBXr1p-efgQgPcoUnsxTs13-1QsCSBRGnOgMKh8A2w6p5HeLX99PEhA4-T_xrMwVkW2HbIiF6A224dX-OJ4DE7uQ_TymTi0-wet-eM-IjosYbmDrDlVzGuntpJNcGXz9aUeEhSZOtFbcnAq03FsYumhGmrCUiRcP27TJaQ5dBZk/s1000/enatransport.jpeg", url: "https://enatransport.com.bd/" },
        { name: "Sonya Enterprise - Ticket", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiAdKgCw4HkQ3YQ1nThz_O59FiGX_J-cdE3uf_fDlJmi0zpBogxanMXMK-wIPxIMXrdXq5w7u64kRT1F1T8uExxFP_ny4zlp0ZMImwl0Bq5sNoVEAbOHj7lG_-ebJCdqeTJ6a1LjZCf3SYTRsvEQkZnvmIiGkUNZ7e7RAKp8pYgqa5jehMctWcjfEhK6Ek/s1280/sonyabus.jpeg", url: "https://sonyabus.com/" },
        { name: "Lal Sobuj Paribahan", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiuv0VDG5aYMoKca0MORqz-MdT9mZwULfx4mLb-74pStYrAfhhvWlDZ6sstWuvnj-gT9JXAGucUq8VX5JZFDxzyjD5R9mEDkyvvQX8KR2dMr_oywEQrIh9VWMUK7SaXHwmnI7nPcwfN5TbPBBiGYlYj9bj-oTp9_KACZtnYGz3DyIEbgAa7E56BlovYbxc/s350/lalsobujbus.jpeg", url: "https://lalsobujbus.com/" },
        { name: "Sara Express - Bus Ticket", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEguqLE2pXxwK3uVxUFUr1iFA9r-odINPYPdCi0MVmPE99DpIrlIIZoXHfPAs8N0u5fgKZcKJUUqc4p03EToc6diZAFBpQNKzABCt5ONjjRwtV7pjZyseDmk62Qr1znFvjX00eMAeBzntIl2SqUbBXIfDxWm-A1rNua4XIYbr4Y2HEOCm8IvLSJNKvmIprk/s826/saraexpress.jpeg", url: "https://www.saraexpress.com/" },
        { name: "Desh Travels", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpjHgzEGNn-phOJnR6jGBWCuWkcglmKSedRohuBuGi39XZUc_5fdZ_nk9f7PbSOm0bbLBgO5sRGBeTExL4oQ0sSfJ-JHl1PdD7pRXRgVhPoJZQE-WH_xk0CvcLa90QMwMJ7GnUUeMhiit9T79Oi41fIPW-quSN3zuIeq4yPAEsSOeluuVVHPJehrJLe4E/s344/deshtravels.jpeg", url: "https://deshtravelsbd.com/" }
    ],
    launch: [
        { name: "Shohoz - Launch Ticket", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6-YOiojE9oOsZIYy9inW1J0iv3sS8lL5diptKtFW1x2bE2ZV5QlHLV2oBKr4ucXtkg2SHH9k5upQzIm0ZhMkGdXukUUENc5Td_OCP5Ec5H_M43ZskW6pd4F7Ux6Evnzj8e-6M6wJFKwelKEiguIU1QmyZa-dwF6_9X7j87VVJRksTy8W4hKIbD_IPtuQ/s300/shohoz.jpeg", url: "https://www.shohoz.com/launch-tickets/" },
        { name: "BdTickets - Launch", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4rj1LljIDCXWGKxsQq1rshi9PrmhT3-bEIHwELuEF5-XbLhD4aEPTwcM_MngUzcXaWdnylrUzGHjvW8FLINCQdbAb-TUmC7ZEFPZVOO9tUgCOX8Hc-vPFSKZE_kmoJWwNDf2uhwwqnuu2MeKVO27otb7qnSIfuT-JaK_iIeMrDo6Z52yW9Ts6VdjtJqM/s384/bdtickets.jpeg", url: "https://bdtickets.com/launch" },
        { name: "Karnafuly Express", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjh29xXRVquqMBCDDp3T4Tb8bQLO7xbSEi2Mwh3ONo-4duzqdCGgWAEq-6dznZHG5LEjnBGrHXhjXMHWNXJ9rcUKbU5Ah4vPJriRDRS290Gd9Czm8fEITnKAgmrFFed0bn123EJgzpX3QPhRTGmhySU1AccB4VCTPsqmBfV8Rz0V902NNB0CbLEiftBNEg/s755/karnafulyexpresss.png", url: "https://karnafulyexpress.com.bd/" },
        { name: "Jatri - Launch", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2jOMe7fIgGFZQF7rz9B4kGYd71gFVmsUYMDUYVHa2daMP5Y5GHu2mNI_Ns0S-XBiQMf-z0MNZ-sCKGsaEa1eCmh5qIKvq91-7-MVQDikXpAGCHOsQhhT1Yhv00HskGBhLWwcTACKFOxxcjXbVagPrC5IuJpuQTKYG-8DAuO2s3zk37xZOvrvT4hEulVM/s72/jatri.jpeg", url: "https://jatri.co/" },
        { name: "Asha Jawa Launch", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj2tcV07jJJ-3LUvKhu9Of8crlVpsyn5Psk2-gD8AFtBTafJhKRuva0_kqEEdH2f_Cq-Hfqc1DAkPqgWXqn5k99uKfsduNiVNjNxMTCWGY1Si7TasKlYjBmBfdzIjq2-gAM6HSgSrzeyGaMs83sQpZ0weZ8TP4EEbVweRLbNWoATyhvzDcaf5-FGDSp2Cc/s124/ashajawaa.png", url: "http://ashajawa.com/" },
        { name: "BDTIX - Launch Operators", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEif7hZGTz4PCSYeD0C_87nsNnuK7K1YBg9IL3jdfEY4ZWWbeVRIbFQBYDvFN_FQajktAFYNikuzRHqpjgv7MX4-ELx2TUZPPE8yZxFE7Wv9sS7J4tPh8V8oM9mmoTPzsbL-Fwwiew6gzGklNyEBZFSUc-sCHz10w-TnAvaV1c9ySsTt1fBDRION4_Lm-Q0/s180/bdtix.jpeg", url: "https://bdtix.com/launch-tickets" },
        { name: "Launch BD - Tickets", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjizJ3ElqL6JylcdW4LTevA5WCg1YXXo8rnEP4BtejTevI9mRa6HBmEl6bFz9VqNP99bPge5EUeV1t0TPc_ZgKifFNA2_7M9hWmYKE5MoR9jCK-oiVkfnOn3-5xcQWn_sSNVvvcy-uN4-_qh3x_ISCrNhCF-fnKvBmZBm5Yu42Zfu88MdONalX-2WTnrYU/s214/launchbd.jpeg", url: "https://www.launchbd.com/" },
        { name: "MV Manami - Launch", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZfCbfkdrYrg-aGuaSRbpNmF9XVYdWzMvCT7iwEJM2RO_TvoWMcIfx7R-hZzHnlOaQdtavTiQUw1rHZraFRl6U4e0df2tads6uI34XILBqHYxvp8YcCX_mjQ-0fIA8_bzDKKuuCVkbrOk7TAvzw1iw14O1cv8t25BrOvn59Q16UkWQjK_XAWEZJRoNRTo/s1076/mvmanami.png", url: "https://booking.mvmanami.com/" }
    ],
    train: [
        { name: "Bangladesh Railway", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSUNuH_uSABZQfbFLMOBTHiV86pyIyb3zc-06PSckvlbnek0P6Squ9T3R2cPQA2kh9b9mqaxPhzHC3Yh46LTcQEuyrtdHBrTuaDLwxfKHbtI6XbKDzDB1kvH-uc6LfX94Hb8CvFa5cD7XvkfIzgtGclNgX7WfRr5kvVK0OyNQN6tI5dgAa-I3JhSuKkds/s250/bdrailwayticket.jpeg", url: "https://bdrailwayticket.com/" },
        { name: "Shohoz - Train Tickets", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6-YOiojE9oOsZIYy9inW1J0iv3sS8lL5diptKtFW1x2bE2ZV5QlHLV2oBKr4ucXtkg2SHH9k5upQzIm0ZhMkGdXukUUENc5Td_OCP5Ec5H_M43ZskW6pd4F7Ux6Evnzj8e-6M6wJFKwelKEiguIU1QmyZa-dwF6_9X7j87VVJRksTy8W4hKIbD_IPtuQ/s300/shohoz.jpeg", url: "https://train.shohoz.com/" },
        { name: "Rapid Pass - Metrorail", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgBCX1n-0arj87F-JKGO67nEdIn2EYNP6cSa6hbLm5jQJDd3bEpQLeZ8XGaCGlJI4Al2MNSTRAnv12PNjYwwRvUACeSrvVPq8djVmMh-cE5n-8W9X3dA4oIwTZa1_q9FK3bFvumNnLwbmb0yQ5U4q9vDUfctOib2HHoGfJY4_IVHyUdDfYsosHQjhDRElw/s193/rapidpass.jpeg", url: "https://rapidpass.com.bd/" },
        { name: "12Go - International", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiNhXZxGNOY2x21KA_I3h8BJvIxZYixoZUgpcnTz80CNGiFUJ-ifAkyWKS5_PGg6y45j3ljBucfSgFjO7_H1yluNPfwes02kk-T35vrC28Tv8ehvMl3BRdW8YVIVzOLHdq5Wfws4o0G8x2kqHME9jkcsiAcsiEVuCJ53I3eYZP1Vk7eUAVXpCtCIfSFIGk/s300/12go.jpeg", url: "https://12go.asia/en/operator/bangladesh-railway" }
    ],
    hotel: [
        { name: "Booking.com - Hotel", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgvPNk3TvT0lL4BfXkm-l7iteYJ22HtXrk6GMgyn5gtmBkfjNGgWbxMF6E8ANHVU0GNI5uS5nt4_wTgD8uXc49W5aFLrUQYkMVCJZsTUr4BWmLsNGfWkiqDOPMzCkSgz7shvqhvHpXSmyXiCXkI2NbkulMJF9eY4455gx_VrMBIhfSPIqjWMqfKsoVWyvY/s300/booking.jpeg", url: "https://www.booking.com/" },
        { name: "Agoda.com - Hotel", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgLbrGvPslGvcE3u0olRG1t3shIsMmleIhXtPNi6SY-K7iYajlUYirqASrSoG6WB53SEMxAM_7oEa5lymsrlMqZzBfYTGMoE-SAW1WP5QL6B5wMA7IwJzlbw4_hXYOrrJnwKhJSn4ymFjGJsfL6A68UecD9E1s7miWNMFZ3YR_IjqPDx0BF25K5lPtmmXQ/s1660/agoda.jpeg", url: "https://www.agoda.com/" },
        { name: "ShareTrip - Hotel", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0NOdrWQEVXv7y_5zQljA9j21ieRiyjxWlrJaWC5YdoD1JkzePW2HOSg79WEFortmh6sNhpd7SRQGDniDlPb9pyb-GDGOKv0A1YRcXlqopbPHcwVZK0K8Z8h0tQEg2ANFKWjkAeemd7ifYa1kdk1SikwKSKX2jQPEjc0VBE7tv1nusYCeCSpMwV3ZET64/s568/sharetrip.jpeg", url: "https://sharetrip.net/hotel" },
        { name: "BdTickets - Hotel", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4rj1LljIDCXWGKxsQq1rshi9PrmhT3-bEIHwELuEF5-XbLhD4aEPTwcM_MngUzcXaWdnylrUzGHjvW8FLINCQdbAb-TUmC7ZEFPZVOO9tUgCOX8Hc-vPFSKZE_kmoJWwNDf2uhwwqnuu2MeKVO27otb7qnSIfuT-JaK_iIeMrDo6Z52yW9Ts6VdjtJqM/s384/bdtickets.jpeg", url: "https://bdtickets.com/hotel" },
        { name: "Travel Price Drops", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLM7KwbKjxq0SN_QULLz9kJjpx6b_P_8GyxOqh19wMDrswAN-WnT0fOAKpd4ro5iONxZTMsTpqGw04Ii4Fu1BMVqsvHIrYF6TY4s4e_b6sRQGdf2OJsiWJ0T3laa_jXytHHLE3_Bz3oNmIPVd9_DZagk9wkN1KieW5sqrwrtWOaXVszxVqwtmboBQgdc4/s256/travelpricedrops.jpeg", url: "https://travelpricedrops.com/hotels" },
        { name: "Search Hotel Prices", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoIacr8PbawoscDvUZM6d1Gln5d4A9OyJv8zRWvBJievvhvhBS_yB4CWN147W8zXrNFPhELTAiyNjm0YwmTw-GddPA7c4avE-XCAC03niLb0JrSD5jfMaRshM_AOGZJCQFOuFLh7xRYzUouVUFybfGh2QrIpWuLaCAD01LPOjd-sensnKPWET6OCHwhVI/s384/searchhotelprices.jpeg", url: "https://searchhotelprices.com/hotels" },
        { name: "Bangladesh Parjatan", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoskqjqcY12UxVGVHWTESNssefykiXr-zctxbaNng9MaMUutUlJ_4UbzOB90gcTwP3ZMS1G4DlG9yqH1BHfDaFw8S7Z6ieKwiw0XCj1KFoh_iZKDenTCqGIaa8YSboyLk2bokfszCSfk1LRDwTMMIEsQkZoYOhgYAhkY3wQ7mq2xz5_FZOO2d1LzhLGjk/s107/hotels.jpeg", url: "https://hotels.gov.bd/" },
        { name: "BdBooking.com", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQHe13NMMdGw0SVB1ncNI5nMlNW8MXGKpxmSebUOCiUcsZVAiZgcmqZR6w302ZHijTu5cJkvgvA6q2huCbtKnIdWQJ5WEGuHFnX-nVVeyXqwU1K2Pl7fhu-Q4-Mc1Z1-vXTP0XkBtic8B0TRNne7KW68x45Cd11R1FskJ30pkImaznX_yGQPQeGRT-uFQ/s224/bdbooking.png", url: "https://www.bdbooking.com/" },
        { name: "GoZayaan - Hotel", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEifWUi0ebKglTSr6lXMXSHmvXP3q62xJ-CvvnDikM5emQVPybzf0fA-nFmKAb4uqf9X4zd5Qux3fxnBNu9hrPxthyphenhyphenXQOI7sc55ejOM5KF7fzxWX_dP0kX80-Ls707TXV-XjWmqOQCcu70vKkjIIUmpaz7u3fmNvPdXBFzmuIVO4tg7frFtd6HmGJGQMETA/s130/gozayaan.jpeg", url: "https://gozayaan.com/?search=hotel" },
        { name: "Cozycozy - BD Hotels", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAKOJ_IrcKlZ0zvIsEmbF2jhxNxJtMOz0rW4no3lh-25FD5wTcN1H7Y0trgCDVCpUXKWnoZL2VHby85hjA2kw37NxBYWYw8ydD7JEhxBLJlJaDiFrUCd-W2_SiauXwZY-Xn8L88j4Z9Z4nD1_3uIPbvn6ZvVC-rTcoSuYv_ZaGKvyqaiJHlWxKVrDOsMM/s182/cozycozy.png", url: "https://www.cozycozy.com/ie/bangladesh-hotels" },
        { name: "Hotels Booking BD", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWd1MrTp-niXRr_JApChVBH3oqOFyz9KKIK2QtN9aQTQ_Gc2awdIksi4YsfHOPZjAzgh4pRwGF4HlfoF7YmkH0JLnBrZ1NJUVnaMfm0Mk0IUvNdC8W6L6_V3YmGZIfsJ2cD-NdnGlUPzSKR56IwGw7bxadOypyu3d1_YBj-Nyqiq9hhgN5rwwA3cdq7l4/s800/hotelsbookingbd.jpeg", url: "https://hotelsbookingbd.com/" },
        { name: "Firsttrip - Hotel", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEilY131MwEU9OziE6aO2japzvY0UtXasuJ8oPOeRXa_Em4MKsbXQJAsUGJAfD7DeZuHH_XiyesjbnxdTF2OX3fCvdJnEV-tKm_wq2oZTajp-fYY4pUZZaDECYhcI85loxnO5XKEvuh3Bysw4RWVH9K7gf8Brsg1TBSMFFxQMwwlYnkgr1MYDQhA2uBXxaY/s494/firsttrip.jpeg", url: "https://firsttrip.com/hotel" }
    ]
};

let travelActiveCat = "airline";

function openTravelModal() {
    if (typeof setActiveMode === "function") setActiveMode("mode-travel-booking");
    document.getElementById("travelBookingModal").style.display = "flex";
    document.body.style.overflow = "hidden";
    renderTravelGrid(travelActiveCat);
}

function closeTravelModal() {
    document.getElementById("travelBookingModal").style.display = "none";
    document.body.style.overflow = "auto";
}

function showTravelCat(cat, btn) {
    travelActiveCat = cat;
    document.querySelectorAll(".t-tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    renderTravelGrid(cat);
}

function renderTravelGrid(cat, search = "") {
    const grid = document.getElementById("travelMasterGrid");
    grid.innerHTML = "";
    
    let list = [];
    if (search) {
        Object.keys(travelData).forEach(k => { list = list.concat(travelData[k]); });
    } else {
        list = travelData[cat];
    }

    const filtered = list.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

    if (filtered.length === 0) {
        grid.innerHTML = "<div style='grid-column:1/-1; padding:50px; text-align:center; color:#94a3b8;'>No result found!</div>";
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "travel-item-card";
        card.innerHTML = `
            <div class="travel-img-box"><img src="${item.img}" alt="${item.name}" loading="lazy"/></div>
            <strong>${item.name}</strong>
            <a href="${item.url}" class="travel-go-btn" target="_blank">Book Now</a>
        `;
        grid.appendChild(card);
    });
}

function filterTravel() {
    const val = document.getElementById("travelSearch").value;
    renderTravelGrid(travelActiveCat, val);
}
