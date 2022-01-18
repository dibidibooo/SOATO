// < ================================================  Основные данные ================================================ >
var main_info_app = new Vue({
    el: "#main_info_app",
    data: {
        message: "ksdjlfl js;dkjf ",
        main_info: {
            name: '',
            parametrs: '',
            signature: '',
            time_from: '',
            time_to: '',
        },
    },
    methods: {
        setFromLocalStorage: function(info) {
            this.main_info = info;
        },
        getToLocalStorage: function() {
            return this.main_info
        }
    }
});
// < ================================================  /Основные данные ================================================ >


// < ================================================  Замысел ================================================ >
var zamisel_app = new Vue({
    el: "#zamisel_app ",
    data: {
        zamisel_info: "",
    },
});
// < ================================================  /Замысел ================================================ >


// < ================================================ Таблица взаимодействий ================================================ >
var contact_table_app = new Vue({
    el: '#contact_table_app',
    data: {
        message: "hello Vue js",
        contact_table: [
            { org_name: "", sign: "", info: "" },
        ],
    },
    methods: {
        addNewContact: function() {
            this.contact_table.push({ org_name: "", sign: "", info: "" })
        },
        removeContact: function() {
            this.contact_table.pop()
        },
        removeContactById: function(id_in_table) {
            this.contact_table.splice(id_in_table, 1)
        },
        getCotnactTableForPDF: function() {
            var result_table = [
                ['№', 'Наименование организации', 'Позывной', 'Дополнительная информация'],
            ]
            var i = 1;
            for (var contact of this.contact_table) {
                row = [
                    { text: i },
                    { text: contact['org_name'] },
                    { text: contact['sign'] },
                    { text: contact['info'] },
                ]
                i++
                result_table.push(row)
            }
            console.log(result_table);
            return result_table
        },
    },
});
// < ================================================ /Таблица взаимодействий ================================================ >


// < ================================================  строевая записка ================================================ >
var stroy_table_app = new Vue({
        el: "#stroy_table_app",
        data: {
            message: "dskfljaskljdf ;jsdl;f",
            stroy_table: [{
                name: "",
                stroy_info: {
                    transport: [{ name: "", quantity: 0 }, ],
                    transport_count: 0,

                    sostav: [{ name: "", quantity: 0 }, ],
                    sostav_count: 0,

                    veapon: [{ name: "", quantity: 0 }, ],
                    veapon_count: 0,

                    bullets: [{ name: "", quantity: 0 }, ],
                    bullets_count: 0,
                }
            }, ],
        },
        methods: {
            // add items
            addItemByPodrzdIdAndType: function(podrazd_id, type) {
                // console.log('add: ' + podrazd_id + ' ' + type);
                if (type == 'transport') {
                    this.stroy_table[podrazd_id].stroy_info.transport.push({ name: "", quantity: 0 })
                }
                if (type == 'sostav') {
                    this.stroy_table[podrazd_id].stroy_info.sostav.push({ name: "", quantity: 0 })
                }
                if (type == 'veapon') {
                    this.stroy_table[podrazd_id].stroy_info.veapon.push({ name: "", quantity: 0 })
                }
                if (type == 'bullets') {
                    this.stroy_table[podrazd_id].stroy_info.bullets.push({ name: "", quantity: 0 })
                }
            },

            // delete items
            deleteItemByPodrazdIdTypeAndId: function(podrazd_id, type, id) {
                // console.log('delete: ' + podrazd_id + ' ' + type + " " + id);
                if (type == 'transport') {
                    this.stroy_table[podrazd_id].stroy_info.transport.splice(id, 1);
                }
                if (type == 'sostav') {
                    this.stroy_table[podrazd_id].stroy_info.sostav.splice(id, 1);
                }
                if (type == 'veapon') {
                    this.stroy_table[podrazd_id].stroy_info.veapon.splice(id, 1);
                }
                if (type == 'bullets') {
                    this.stroy_table[podrazd_id].stroy_info.bullets.splice(id, 1);
                }
            },

            //add podrazd
            addPodrazd: function() {
                // console.log("add podrazd");
                this.stroy_table.push({
                    name: "",
                    stroy_info: {
                        transport: [{ name: "", quantity: 0 }, ],
                        transport_count: 0,

                        sostav: [{ name: "", quantity: 0 }, ],
                        sostav_count: 0,

                        veapon: [{ name: "", quantity: 0 }, ],
                        veapon_count: 0,

                        bullets: [{ name: "", quantity: 0 }, ],
                        bullets_count: 0,
                    }
                });
            },

            // delete podrazd
            deletPodrazdById: function(podrazd_id) {
                // console.log("add podrazd");
                this.stroy_table.splice(podrazd_id, 1);
            },

            // get row
            getItemRow: function(items, count, table, header) {
                for (var item_id = 0; item_id < items.length; item_id++) {
                    var item = items[item_id]
                    var item_count = count

                    var item_name = item.name
                    var item_value = item.quantity
                    var item_row = [
                        { text: header + ": " + item_count, rowSpan: items.length },
                        { text: item_name },
                        { text: item_value },
                    ]
                    table.push(item_row)
                }
            },

            // get data for pdf table
            getStroyTableForPDF: function() {
                var stroyt_table = []
                var podrazds = this.stroy_table
                    // console.log(podrazds.length);
                for (var podrazd_id = 0; podrazd_id < podrazds.length; podrazd_id++) {
                    // get podrazd
                    var podrazd = podrazds[podrazd_id]
                    var podrazd_name = podrazd.name
                    var podrazd_row = [
                        { text: podrazd_id + 1 + '. Подразделение: ' + podrazd_name, bold: true, style: 'tableHeader', colSpan: 3 }, {}, {},
                    ]
                    stroyt_table.push(podrazd_row)

                    // Транспорт
                    this.getItemRow(podrazd.stroy_info.transport, podrazd.stroy_info.transport_count, stroyt_table, 'Транспорт')

                    // Личный состав
                    this.getItemRow(podrazd.stroy_info.sostav, podrazd.stroy_info.sostav_count, stroyt_table, 'Личный состав')

                    // Вооружение
                    this.getItemRow(podrazd.stroy_info.veapon, podrazd.stroy_info.veapon_count, stroyt_table, 'Вооружение')

                    // Личный состав
                    this.getItemRow(podrazd.stroy_info.bullets, podrazd.stroy_info.bullets_count, stroyt_table, 'Боеприпасы')
                }
                return stroyt_table
            },

            // get sum items in type
            getSumOfItems: function(type) {
                var sum = 0
                for (var j = 0; j < type.length; j++) {
                    var item = type[j]
                    sum += item.quantity * 1;
                }
                return sum
            },

            // find sum quantity
            findSunQuantity: function() {
                for (var i = 0; i < this.stroy_table.length; i++) {
                    // transport count 
                    var podrazd = this.stroy_table[i];
                    podrazd.stroy_info.transport_count = this.getSumOfItems(podrazd.stroy_info.transport)
                    podrazd.stroy_info.sostav_count = this.getSumOfItems(podrazd.stroy_info.sostav)
                    podrazd.stroy_info.veapon_count = this.getSumOfItems(podrazd.stroy_info.veapon)
                    podrazd.stroy_info.bullets_count = this.getSumOfItems(podrazd.stroy_info.bullets)
                }
            },

            // -----------local storage-----------

            saveToLocalStorage: function() {
                console.log("save to local storage");
                localStorage.setItem('stroy_table', JSON.stringify(this.stroy_table));
            },

            getFromLocalStorage: function() {
                this.stroy_table = JSON.parse(localStorage.getItem("stroy_table"));
                // console.log(getFromLocalStorage);
            },
            // -----------/local storage-----------
        },
    })
    // < /===============================================  /строевая записка ================================================ >


// < /===============================================  Метео условия ================================================ >
var meteo_app = new Vue({
    el: "#meteo_app",
    data: {
        meteo_info: {
            temperature: 10,
            moisture: 30,
            pleasure: 1,
            wind_speed: 1,
        }
    }
});
// < /===============================================  /Метео условия ================================================ >
var sended_features;
var save_update;
// < /===============================================  Сохранение в локальном хранилище ================================================ >
var local_save_app = new Vue({

    el: "#save_to_local",
    data: {
        to_local_storage: '',
        savings_names: [],
        is_readonly: false,
        now_save: '',
    },
    created: function() {
        this.getAllSaves();
    },
    methods: {
        // ----------- change now save name flag -----------
        // save selected and dont change save name
        saveSelected: function() {
            this.is_readonly = true;
        },
        //save not selected and may change save name
        saveNotSelected: function() {
            this.is_readonly = false;
        },
        // ----------- change now save name flag -----------


        // ----------- load list -----------
        getAllSaves: function() {
            // console.log(Object.keys(localStorage));
            var keys = Object.keys(localStorage)
            this.savings_names = []
            for (var i = 0; i < keys.length; i++) {
                var from_local_storage = JSON.parse(localStorage.getItem(keys[i]));
                this.savings_names.push({ name: keys[i], date: from_local_storage.date })
            }
            // console.log(this.savings_names);

            // TODO: sort by date
        },
        // ----------- /load list -----------


        // -----------local storage-----------
        saveToLocalStorage: function() {
            // console.log("save to local storage");
            if (this.now_save == "") {
                alert("Введите название сохранения")
                return
            }

            for (var i = 0; i < this.savings_names.length; i++) {
                // console.log(this.savings_names[i]['name']);
                if (this.now_save == this.savings_names[i]['name']) {
                    rewrite = confirm("Вы точно хотите перезаписать сохраннение " + this.now_save + "?")
                    if (!rewrite) {
                        return
                    }
                }
            }

            var save_name = this.now_save
            this.saveSelected();
            //get all data for save
            this.to_local_storage = {
                // main info
                main_info: main_info_app.getToLocalStorage(),

                //zamisel 
                zamisel: zamisel_app.zamisel_info,

                // contact table
                contact_table: contact_table_app.contact_table,

                //stroy_table_app
                stroy_table: stroy_table_app.stroy_table,

                //meteo
                meteo: meteo_app.meteo_info,

                //date
                date: new Date().toLocaleString(),
                // map

            };

            // save to index DB
            this.saveIconsToDB(save_name)

            localStorage.removeItem(save_name);

            // save
            localStorage.setItem(save_name, JSON.stringify(this.to_local_storage));
            this.getAllSaves()

            alert("Сохранение '" + save_name + "' успешно сохранено")
        },

        getFromLocalStorage: function(i) {
            console.log("get from local storage");
            var saving_name = this.savings_names[i]['name']
            this.now_save = saving_name;
            this.saveSelected();


            from_local_storage = JSON.parse(localStorage.getItem(saving_name));
            // console.log(from_local_storage);

            // write to tables
            main_info_app.main_info = from_local_storage.main_info;
            zamisel_app.zamisel_info = from_local_storage.zamisel
            contact_table_app.contact_table = from_local_storage.contact_table
            stroy_table_app.stroy_table = from_local_storage.stroy_table
            meteo_app.meteo_info = from_local_storage.meteo

            // get to icons
            this.getIconsAndDescriptionFromDB(saving_name)

            alert("Схранение '" + saving_name + "' успешно загружено!")
        },

        testDateNow: function() {
            var date = new Date()
            console.log(date.toString());
        },

        removeSavingInLocalStorage: function(i) {
            var saving_name = this.savings_names[i]['name']
                // console.log(saving_name);
            localStorage.removeItem(saving_name);
            this.getAllSaves()

            this.removeDBSaves(saving_name)

            alert("Сохранение '" + saving_name + "' успешно удалено")

        },
        // -----------/local storage-----------

        // -----------index DB-----------
        // save icons (object and sign) to index DB
        saveIconsToDB: function(save_name) {
            let db;
            var request = indexedDB.open(save_name, 1)

            request.onerror = function(err) {
                console.log(err);
            };

            // save all icons
            request.onsuccess = function() {
                console.log("db success opened");


                // При успешном открытии вызвали коллбэк передав ему объект БД
                db = request.result

                let transaction_obj = db.transaction(['objects'], 'readwrite')
                transaction_obj.oncomplete = function(event) {
                    console.log("Objects done!");
                };
                transaction_obj.onerror = function(event) {
                    console.log(event);
                };
                var ObjectStore = transaction_obj.objectStore('objects')
                ObjectStore.clear()
                var objects_data = icons_app.object_icons
                for (var i in objects_data) {
                    ObjectStore.add(objects_data[i])
                }

                //MAP
                let transaction_map = db.transaction(['map_features'], 'readwrite')
                transaction_map.oncomplete = function(e) {
                    console.log("map done!");
                }

                transaction_map.onerror = function(e) {
                    console.log(e);
                }

                var MapStore = transaction_map.objectStore("map_features");
                MapStore.clear();

                // console.log(JSON.stringify(source.getFeatures(), getid()));
                // window.tf = JSON.stringify(source.getFeatures(), getid());
                // var sended_features = [...source.getFeatures(), getid()]

                console.log(JSON.stringify(source.getFeatures()));
                window.tf = JSON.stringify(source.getFeatures());
                sended_features = [...source.getFeatures()];
                MapStore.add({ 'features': JSON.stringify(sended_features) });

            }







            request.onupgradeneeded = function(e) {
                db = e.target.result;
                // Если БД еще не существует, то создаем хранилище объектов.
                // objects
                let ObjectStore = db.createObjectStore("objects", { keyPath: "id", autoIncrement: true }); //, autoIncrement: true
                ObjectStore.createIndex('src', 'src', { unique: false });
                ObjectStore.createIndex('description', 'description', { unique: false });

                // signs
                let SignStore = db.createObjectStore("signs", { keyPath: "id", autoIncrement: true }); //, autoIncrement: true
                SignStore.createIndex('src', 'src', { unique: false });
                SignStore.createIndex('description', 'description', { unique: false });
                console.log("success setting DB");

                // map
                let MapStore = db.createObjectStore("map_features", { keyPath: "id", autoIncrement: true }); //, autoIncrement: true
                // MapStore.createIndex('src', 'src', { unique: false });
                MapStore.createIndex('features', 'features', { unique: false });
                console.log("success setting DB");


            }
        },

        // get icons and descriptions
        getIconsAndDescriptionFromDB: function(save_name) {
            console.log("saveIconsToDB");
            let db;
            var request = indexedDB.open(save_name, 1)

            request.onerror = function(err) {
                console.log(err);
            };

            // get all icon from db
            request.onsuccess = function() {
                db = request.result;

                let transaction_obj = db.transaction(['objects'], 'readwrite')
                    //objects
                transaction_obj.oncomplete = function(event) {
                    console.log("Objects done!");
                };
                transaction_obj.onerror = function(event) {
                    console.log(event);
                };
                var ObjectStore = transaction_obj.objectStore('objects')
                ObjectStore.getAll().onsuccess = function(event) {
                    var object_icons = event.target.result
                    icons_app.object_icons = []
                    for (var i = 0; i < object_icons.length; i++) {
                        icons_app.object_icons.push({
                            src: object_icons[i].src,
                            description: object_icons[i].description,
                        });
                    }
                };

                let transaction_map = db.transaction(['map_features'], 'readwrite')
                transaction_map.oncomplete = function(event) {
                    console.log("map done!");
                }

                transaction_map.onerror = function(event) {
                    console.log(event);
                }

                var MapStore = transaction_map.objectStore('map_features');

                MapStore.getAll().onsuccess = function(event) {




                    map_features = event.target.result;
                    map_features.ol_uid = '0';
                    // JSON.parse(source.addFeatures(upload_features[0].features));
                    // console.log(storage);

                    // var storage = JSON.parse(source.addFeatures(upload_features[0].features));


                    // console.log(JSON.parse(map_features[0].features));





                    console.log(map_features);
                    map_features = JSON.parse(map_features[0].features)






                    console.log(map_features);
                    map_features = new Feature;

                    console.log(source.addFeatures((map_features)));
                    source.addFeatures((map_features));











                    // console.log(source.addFeature(map_features));
                    // source.addFeature(map_features);
                    // // map_features = JSON.parse(map_features);
                    // console.log(JSON.parse(source.addFeatures(map_features)));
                    // JSON.parse(source.addFeatures(map_features));





                    // console.log(source.addFeatureInternal(save_feature));

                    // save_update = source.addFeatureInternal(save_feature);



                    // var add_feature = source.getId();

                    // console.log(map_features);
                    // var map_features = event.target.result;
                    // // console.log(featureKey);
                    // // var featureKey = source.getUid(map_features[0].features);
                    // // console.log(JSON.parse(map_features[0].features));
                    // // window.tf = JSON.parse(map_features.features);
                    // // console.log(JSON.parse(map_features.features));
                    // // console.log(safe_feature);
                    // // var safe_feature = source.ol_uid(map_features[0].features);
                    // // console.log(save_features);
                    // // var save_features = JSON.parse(source.addFeatures(map_features[0].feature));
                    // // save_features = ol_uid('5');

                    // console.log(JSON.parse(source.addFeatures(map_features[0].features)));
                    // console.log(save.features);
                    // var save = JSON.parse(source.addFeatures(map_features[0]));




                };
            };

            request.onupgradeneeded = function(e) {
                console.log("db onupgradeneeded");
            };
        },




        // delete save db
        removeDBSaves: function(save_name) {
            var db_for_delete = window.indexedDB.deleteDatabase(save_name);
            db_for_delete.onerror = function(e) {
                console.log("error db");
                console.log(e);
            }
            db_for_delete.onsuccess = function(e) {
                console.log("db deleted successfully");
                console.log(e.result);
            }
        },
        // -----------/index DB-----------
    }
});

function testStorage() {
    if (localStorage && !localStorage.getItem('size')) {
        console.log("test local storage");
        var i = 0;
        try {
            // Test up to 10 MB
            for (i = 250; i <= 10000; i += 250) {
                localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
            }
        } catch (e) {
            localStorage.removeItem('test');
            localStorage.setItem('size', i - 250);
        }
    }
}
// < /===============================================  /Сохранение в локальном хранилище ================================================ >


// < ============================== Generate PDF from html ============================== >
//PDFmake
// open layer example "export map"  https://openlayers.org/en/latest/examples/export-map.html
function generateImageFromMap() {
    console.log(">>> generateImageFromMap");
    map.once('rendercomplete', function() {
        console.log(">> map once");
        var mapCanvas = document.createElement('canvas');
        var size = map.getSize();
        mapCanvas.width = size[0];
        mapCanvas.height = size[1];
        var mapContext = mapCanvas.getContext('2d');

        Array.prototype.forEach.call(
            document.querySelectorAll('.ol-layer canvas'),
            function(canvas) {
                if (canvas.width > 0) {
                    var opacity = canvas.parentNode.style.opacity;
                    mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                    var transform = canvas.style.transform;
                    // Get the transform parameters from the style's transform matrix
                    var matrix = transform
                        .match(/^matrix\(([^\(]*)\)$/)[1]
                        .split(',')
                        .map(Number);
                    // Apply the transform to the export map context
                    CanvasRenderingContext2D.prototype.setTransform.apply(
                        mapContext,
                        matrix
                    );
                    mapContext.drawImage(canvas, 0, 0);
                }
            }
        );

        console.log(">> end forEach");
        downloadPDF_A1(mapCanvas.toDataURL());
        console.log(mapCanvas.toDataURL());
    });
    map.renderSync();
}

function downloadPDF_A1(canvasData) {
    console.log(">>> downloadPDF_A1");
    //create pdf
    var borderOnOff = 'Borders' // lightHorizontalLines noBorders headerLineOnly 
    var contactTable = contact_table_app.getCotnactTableForPDF()
    var stroyTable = stroy_table_app.getStroyTableForPDF()
        //var iconsBody = getIcons_forPDF()
    var iconsBody = icons_app.getIconsAndDesForPDF();

    var docInfo = {
        info: {
            title: "СО и АТО",
            author: "MEG",
        },
        pageSize: "A1",
        pageOrientation: "landscape",
        pageMargins: [20, 20, 20, 50],

        // CONTENT
        content: [{
            columns: [
                // Left colum
                {
                    // auto-sized columns have their widths based on their content
                    width: '20%',

                    text: "Alfa",
                    // text: 'First column',
                    table: {
                        widths: ['100%'],
                        heights: [900, 600, 125],
                        body: [

                            // Новая строевая записка
                            [{
                                table: {
                                    headerRows: 1,
                                    widths: ['35%', '40%', '25%'],

                                    header: [],
                                    body: stroyTable

                                }
                            }],

                            // Таблица взаимодействий
                            [{
                                table: {
                                    headerRows: 1,
                                    widths: ['5%', '25%', '25%', '45%'],
                                    header: [],
                                    body: contactTable

                                }
                            }],

                            // ["Метеоданные:"],
                            [{
                                ul: [
                                    { text: "Метеоданные", bold: true },
                                    {
                                        ul: [
                                            "Температура(°C)" + ": " + meteo_app.meteo_info.temperature,
                                            "Влажность(%)" + ": " + meteo_app.meteo_info.moisture,
                                            "Давление воздуха" + ": " + meteo_app.meteo_info.pleasure,
                                            "Скорость ветра(м/с)" + ": " + meteo_app.meteo_info.wind_speed,
                                        ]
                                    }
                                ]
                            }],
                        ],
                    },
                    layout: borderOnOff
                },

                // Center col
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: '*',
                    table: {
                        widths: ['100%'],
                        heights: [70, 70, 1355, 125],
                        alignment: 'center',
                        body: [
                            [{ text: main_info_app.main_info.name + " ", alignment: 'center', fontSize: 20 }],
                            [{ text: main_info_app.main_info.parametrs + " ", alignment: 'center', fontSize: 20 }],
                            [{
                                image: canvasData,
                                width: 1630,
                                // height:1355,
                                margin: [0, 180, 0, 0],
                            }],

                            [{
                                text: main_info_app.main_info.signature + "            __________/______________/__________/",
                                fontSize: 20,
                                margin: [0, 70, 0, 0]
                            }]
                        ]
                    },
                    // layout: borderOnOff
                },

                // Right col
                {
                    // fixed width
                    width: '10%',
                    text: "Alfa",
                    table: {
                        widths: ['100%'],
                        heights: [100, 700, 825],
                        body: [

                            //time 
                            ["Время: с " +
                                main_info_app.main_info.time_from +
                                " до " +
                                main_info_app.main_info.time_to
                            ],

                            // zamis
                            ["Замысел:\n" + zamisel_app.zamisel_info + " "],

                            // icons
                            [{
                                layout: 'noBorders',
                                table: {
                                    widths: ["15%", '85%'],
                                    body: iconsBody,
                                },
                                layout: borderOnOff

                            }],
                        ]
                    },
                    layout: borderOnOff
                },

            ],
            columnGap: 1
        }],

    };
    pdfMake.createPdf(docInfo).download(main_info_app.main_info.name + '_A1.pdf');
}

// Получение иконок и их названий
function getIcons_forPDF() {
    console.log(">>> getIcons_forPDF");
    var images = document.querySelectorAll('.input-inline');
    var descriptions = document.querySelectorAll('.form-control-sm')
    var body = []
    for (var i = 0; i < images.length; i++) {
        // alert(images[i].src)
        var description = descriptions[i].value
        var row = [{
                image: images[i].src,
                width: 32,
                height: 32
            },
            { text: description },
        ];
        body.push(row);

    }
    return body
}
// < /============================== Generate PDF from html ==============================/ >

// < /============================== ONLOAD ==============================/ >
window.onload = function() {
        // canvas = document.getElementById("drawingCanvas");
        // context = canvas.getContext("2d");

        // Установка размера
        // canvas.width = document.getElementById("icon_place").offsetWidth;
        // canvas.height = document.getElementById("icon_place").offsetHeight;

        // setDraw()

        // default_img_width = document.getElementById('map_image').width
        // default_img_height = document.getElementById('map_image').height
        // default_img_left = document.getElementById('map_image').getBoundingClientRect().left
        // default_img_top = document.getElementById('map_image').getBoundingClientRect().top

    }
    // < /============================== /ONLOAD ==============================/ >

// < ================================================ ZOOM ================================================ >
function onOffZoom() {
    var check = document.getElementById('on_off_zoom')
    if (check.checked == true) {
        // alert("start zoom")
        startZoom()
    } else {
        // alert("stop zoom")

        stopZoom()
    }
}

var is_zoom = false

function startZoom() {
    // отключение выделения иконки 
    if (editing_image) {
        var previous_img = document.getElementById(editing_image)
        previous_img.classList.remove("selected");
        setInActiveIcon()
    }

    is_zoom = true
    html2canvas(document.querySelector("#map")).then(canvas => {
        imgData = canvas.toDataURL("image/png");
        magnify("map", "map_image", 3, imgData)
    });
}

function stopZoom() {
    is_zoom = false
    imgData = ''
    var zoom_glass = document.getElementById('zoom_glass')
    zoom_glass.parentNode.removeChild(zoom_glass)
    html2canvas(document.querySelector("#map")).then(function(canvas) {
        imgData = canvas.toDataURL("image/png");
        magnify("map", "map_image", 3, imgData)
    });
    // html2canvas(document.querySelector("#map")).then(canvas => {
    //     imgData = canvas.toDataURL("image/png");
    //     magnify("map", "map_image", 3, imgData)
    // });
}

var default_img

function magnify(divID, imgID, zoom, imgData) {
    if (is_zoom) {
        var img, glass, w, h, bw, workPlace;
        workPlace = document.getElementById(divID)
        img = document.getElementById(imgID);
        /*создать увеличительное стекло:*/
        glass = document.createElement("DIV");
        glass.setAttribute("class", "img-magnifier-glass");
        glass.setAttribute("id", "zoom_glass");
        /*вставить увеличительное стекло:*/
        workPlace.parentElement.insertBefore(glass, workPlace);
        /*установите свойства фона для увеличительного стекла:*/

        glass.style.backgroundImage = "url('" + imgData + "')";
        // glass.style.backgroundImage = "url('" + img.src + "')";
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = (default_img_width * zoom) + "px " + (default_img_height * zoom) + "px";
        console.log(default_img_width + 'x' + default_img_height);
        console.log(default_img_left + 'x' + default_img_top);
        bw = 3;
        w = glass.offsetWidth / 2;
        h = glass.offsetHeight / 2;
        /*выполните функцию, когда кто-то перемещает лупу по изображению:*/
        glass.addEventListener("mousemove", moveMagnifier);
        workPlace.addEventListener("mousemove", moveMagnifier);
        /*а также для сенсорных экранов:*/
        glass.addEventListener("touchmove", moveMagnifier);
        workPlace.addEventListener("touchmove", moveMagnifier);

        function moveMagnifier(e) {
            var pos, x, y;
            /*предотвратите любые другие действия, которые могут произойти при перемещении по изображению*/
            // e.preventDefault();
            /*получить позиции курсора x и y:*/
            pos = getCursorPos(e);
            x = pos.x;
            y = pos.y;
            w_zoom = w / zoom
            h_zoom = h / zoom
                /*не допускайте просмотра увеличительного стекла вне изображения:*/
            if (x > default_img_width - w_zoom) {
                x = default_img_width - w_zoom;
            }
            if (x < w_zoom) {
                x = w_zoom;
            }
            if (y > default_img_height - h_zoom) {
                y = default_img_height - h_zoom;
            }
            if (y < h_zoom) {
                y = h_zoom;
            }
            /*покажите что такое лупа:*/
            glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";


            /*установите положение увеличительного стекла:*/
            x_g = x - w
            if (x_g < 0) {
                x_g = 0
            } else {
                if (x + w > default_img_width) {
                    x_g = default_img_width - w * 2
                }
            }

            y_g = y - h
            if (y_g < 0) {
                y_g = 0
            } else {
                if (y + w > default_img_height) {
                    y_g = default_img_height - h * 2
                }
            }
            glass.style.left = x_g + "px";
            glass.style.top = y_g + "px";

            // glass.style.left = (x - w) + "px";
            // glass.style.top = (y - h) + "px";
        }

        function getCursorPos(e) {
            var x = 0,
                y = 0;
            e = e || window.event;
            /*получить x и y позиции изображения:*/
            // a = img.getBoundingClientRect();
            /*вычислите координаты курсора x и y относительно изображения:*/
            // x = e.pageX - a.left;
            // y = e.pageY - a.top;
            x = e.pageX - default_img_left;
            y = e.pageY - default_img_top;
            /*рассмотрим любую прокрутку страницы:*/
            // x = x - window.pageXOffset;
            // y = y - window.pageYOffset;
            return {
                x: x,
                y: y
            };
        }
    }
}
//< /================================================ ZOOM ================================================ >


//< ================================================ Draw ================================================ >

var canvas;
var context;
var isDrawing;



function setDraw() {
    // отключение выделения иконки 
    if (editing_image) {
        var previous_img = document.getElementById(editing_image)
        previous_img.classList.remove("selected");
        setInActiveIcon()
    }

    // Подключаем требуемые для рисования события 
    canvas.onmousedown = startDrawing;
    canvas.onmouseup = stopDrawing;
    canvas.onmouseout = stopDrawing;
    canvas.onmousemove = draw;

    canvas.setAttribute('ontouchstart', "handleStart(event)")
    canvas.setAttribute('ontouchmove', "handleMove(event)")
    canvas.setAttribute('ontouchend', "handleEnd(event)")
    canvas.setAttribute('touchcancel', "handleCancel(event)")
}

function setCleaning() {
    // Подключение требуемых для стирания события
    canvas.onmousedown = startCleaning;
    canvas.onmouseup = stopCleaning;
    canvas.onmouseout = stopCleaning;
    canvas.onmousemove = сleaning;

    canvas.setAttribute('ontouchstart', "startCleaning(event)")
    canvas.setAttribute('ontouchmove', "сleaning(event)")
    canvas.setAttribute('ontouchend', "stopCleaning()")
    canvas.setAttribute('ontouchleave', "stopCleaning()")
}

//Смена слоя наверху
function setDrawToFront(newZIndex) {
    canvas.style.zIndex = newZIndex;
    setDraw()
}

//// DRAWING
// var previousColorElement;

function changeColor(color, imgElement) {
    setDraw()
    setDrawToFront(15)

    // 	смена цвета 
    context.strokeStyle = color;

    var pen = document.getElementById("pen")
    pen.setAttribute('src', imgElement.src)
}


function changeThickness(thickness, imgElement) {
    setDraw()
    setDrawToFront(15)

    // Изменяем текущую толщину линии
    context.lineWidth = thickness;
}

function startDrawing(e) {
    // отключение выделения иконки 
    if (editing_image) {
        var previous_img = document.getElementById(editing_image)
        previous_img.classList.remove("selected");
        setInActiveIcon()
    }

    // Создаем новый путь (с текущим цветом и толщиной линии) 
    context.beginPath();

    // Нажатием левой кнопки мыши помещаем "кисть" на холст
    var map_location = document.getElementById("map").getBoundingClientRect();
    context.moveTo(e.pageX - canvas.offsetLeft - map_location.left, e.pageY - canvas.offsetTop - map_location.top);


    var x = e.pageX - canvas.offsetLeft - map_location.left
    var y = e.pageY - canvas.offsetTop - map_location.top


    // Начинаем рисовать
    isDrawing = true;
}

function draw(e) {
    e.preventDefault

    if (isDrawing == true || e.type == "touchmove") {
        // Определяем текущие координаты указателя мыши
        var map_location = document.getElementById("map").getBoundingClientRect();

        if (e.type == "touchmove") {
            var x = e.changedTouches[0].pageX - canvas.offsetLeft - map_location.left;
            var y = e.changedTouches[0].pageY - canvas.offsetTop - map_location.top;
        } else {
            var x = e.pageX - canvas.offsetLeft - map_location.left;
            var y = e.pageY - canvas.offsetTop - map_location.top;
        }
        // Рисуем линию до новой координаты
        context.lineTo(x, y);
        context.stroke();
    }
}

function stopDrawing() {
    isDrawing = false;
}

////////// sensor draw
var ongoingTouches = [];

function handleStart(evt) {
    evt.preventDefault();
    // console.log("touchstart.");
    var el = canvas;
    var ctx = context;
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
        var color = colorForTouch(touches[i]);
        ctx.beginPath();
        var map_location = document.getElementById("map").getBoundingClientRect();

        ctx.arc(touches[i].pageX - -map_location.left, touches[i].pageY - -map_location.top, 0, 0, 0 * Math.PI, false); // a circle at the start
    }
}

function handleEnd(evt) {
    evt.preventDefault();
    // log("touchend");
    var el = canvas;
    var ctx = context;
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        // var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            // ctx.lineWidth = 4;
            // ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            // ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8); // and a square at the end
            ongoingTouches.splice(idx, 1); // remove it; we're done
        } else {
            // console.log("can't figure out which touch to end");
        }
    }
}

function handleCancel(evt) {
    evt.preventDefault();
    // console.log("touchcancel.");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);
        ongoingTouches.splice(idx, 1); // remove it; we're done
    }
}

function handleMove(evt) {
    evt.preventDefault();
    var el = canvas;
    var ctx = context;
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        // var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            // console.log("continuing touch " + idx);
            ctx.beginPath();
            var map_location = document.getElementById("map").getBoundingClientRect();

            // console.log("ctx.moveTo(" + ongoingTouches[idx].pageX + ", " + ongoingTouches[idx].pageY + ");");
            ctx.moveTo(ongoingTouches[idx].pageX - canvas.offsetLeft - map_location.left, ongoingTouches[idx].pageY - canvas.offsetTop - map_location.top);
            // console.log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
            ctx.lineTo(touches[i].pageX - canvas.offsetLeft - map_location.left, touches[i].pageY - canvas.offsetTop - map_location.top);
            // ctx.lineWidth = 4;
            // ctx.strokeStyle = color;
            ctx.stroke();

            ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
            // console.log(".");
        } else {
            // console.log("can't figure out which touch to continue");
        }
    }
}

function colorForTouch(touch) {
    var r = touch.identifier % 16;
    var g = Math.floor(touch.identifier / 3) % 16;
    var b = Math.floor(touch.identifier / 7) % 16;
    r = r.toString(16); // make it a hex digit
    g = g.toString(16); // make it a hex digit
    b = b.toString(16); // make it a hex digit
    var color = "#" + r + g + b;
    // console.log("color for touch with identifier " + touch.identifier + " = " + color);
    return color;
}

function copyTouch({ identifier, pageX, pageY }) {
    return { identifier, pageX, pageY };
}

function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier;

        if (id == idToFind) {
            return i;
        }
    }
    return -1; // not found
}

////////// /sensor draw



//// CLEANING
function startCleaning(e) {

    // Создаем новый путь
    context.beginPath();

    // Нажатием левой кнопки мыши помещаем "кисть" на холст
    var map_location = document.getElementById("map").getBoundingClientRect();
    context.moveTo(e.pageX - canvas.offsetLeft - map_location.left, e.pageY - canvas.offsetTop - map_location.top);

    // Начинаем стирать
    isDrawing = true;
}

var eraser_size = 32

function changeEraserSize(size) {
    setCleaning()
    eraser_size = size
}

function сleaning(e) {
    if (isDrawing == true) {
        // Определяем текущие координаты указателя мыши
        var map_location = document.getElementById("map").getBoundingClientRect();

        if (e.type == "touchmove") {
            var x = e.changedTouches[0].pageX - canvas.offsetLeft - map_location.left;
            var y = e.changedTouches[0].pageY - canvas.offsetTop - map_location.top;
            // console.log(': x= ' + x + " | y= " + y);
            // console.log("event: " + e.type);
        } else {
            var x = e.pageX - canvas.offsetLeft - map_location.left;
            var y = e.pageY - canvas.offsetTop - map_location.top;
        }

        var clearWidgh = eraser_size
        var clearHeight = eraser_size

        // Стриаем до новой координаты
        context.clearRect(x - clearWidgh / 2, y - clearHeight / 2, clearWidgh, clearHeight);
        context.stroke();
    }
}

function stopCleaning() {
    isDrawing = false;
}

// Очистить всё
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//< /================================================ Draw ================================================ >
//<==================================================Maps==================================================>