# D·engage Onprem CDMP Onboarding

*Source: D·engage_Onprem_CDMP_Onboarding.docx*




## 1. On-Premises Kurulum (1 ila 2 hafta)

İlk adım olarak CDMP platformunun üzerinde çalışacağı altyapının kurulum ve konfigürasyonu gerçekleştirilmektedir. Test ve Prod ortamlarında kuruluma ait şema çizildikten sonra kurulum Docker vasıtasıyla yapılacağından buna uygun olarak yönergeler paylaşılır.

Ardından gerekli olan Postgre DB, Zabbix, Graylog, RabbitMQ, MTA engine vb. gibi modüller kurulur. CDMP Admin panelin devreye alınması sonrası test edilir ve bir sonraki aşama için Pazarlama Platformunun entegrasyonuna geçilir.

Bu bölüm müşterimizin IT’sinin yoğunluğu ve D·engage’e uzaktan VPN bağlantı erişimi verip, vermeme durumuna göre kurulum süresinde değişkenlikler gösterir.

## 2. Proje Başlangıç Toplantısı (1 ila 2 gün)

Alt yapı kurulumu tamamlanan platformun, belli başlı standart entegrasyonuna geçilir. Bunun için öncelikle Pazarlama ekipleri ile kick off toplantısı gerçekleştirilir ve gerçekleştirilmek istenen, önceliklendirilen senaryolar görüşülür. Bu senaryolar için genel yol haritası çıkartılır. Senaryolar ve yapılmak istenenlere yönelik olarak hangi tabloların oluşturulması gerektiği, pazarlama açısından hangi verilerin D·engage platformunda yer almasına gerektiğine karar verilir. Ardından da web / mobil uygulamalar gibi farklı kaynaklarda bulunan olayların hangilerinin ne amaçla toplanacakları kararlaştırılır ve uygulama buna göre başlatılır.

## 3. Hesap kurulumu (2 ila 3 gün)

Kullanılacak olan platforma ait hesap oluşturulur ve kullanıcılar tanımlanır. Bununla birlikte Email kanalına gönderen bilgileri tanımlanır ve gönderen adres için DNS kayıtları müşterimizin network ekibi ile paylaşılır. Kayıtlar tamamlandıktan sonra hesaba tanımlanır ve Email pazarlama için alt yapı hazır hale gelir.

## 4. Veri Senkronizasyonu (2 ila 3 hafta)

İlişkisel veritabanında kullanılacak olan tablolar ve içindeki alan tipleri ile birlikte oluşturulur. Proje başlangıç toplantısına göre Müşteriler, Olaylar, Ürünler/Servisler, Kategoriler, Ürün Varyantları, Markalar vb kullanılacak veriler için ilgili veri tabloları oluşturulur.

Müşteri olaylarının toplanması için D·engage Web SDK’i kullanılacaksa ilgili tanımlama yapılır. Mobil uygulama tarafından olaylar toplanacaksa da Mobil SDK entegrasyonuna paralelde başlanabilir.

Müşterilerin hesaba kayıt edilebilmesi ve güncellemelerin anlık yapılabilmesi adına API entegrasyon bilgileri platformdan üzerinden güvenli bir şekilde sağlanır. Verilerin ilk yüklemeleri manuel CSV file / FTP ya da Rest API üzerinden gerçekleştirilebilir.

## 5. Dijital Kanal Entegrasyonu (2 ila 3 hafta)

Bu bölümde sözleşmeye göre kullanılacak olan dijital kanal entegrasyonlarına başlanır.

Email kanalı için hesap açılışı esnasında "Gönderici” bilgileri tanımlandığından ötürü bu adımda içerik şablonlarının hazırlanmasına yönelik çalışmalar yapılır. Gönderimlere hemen başlanmak istenirse de müşteriye atanan IP’lerin ısıtma sürecine devam edilir. 

SMS kanalı için operatör taraflı sözleşmesel işlemlerin tamamlanma süreci başlar. Bu tamamlandıktan sonra API erişim yetkileri hesaba tanımlandıktan sonra gönderim denemeleri yapılır ve kanal canlıya alınır. Bu noktada ilk adımdaki On-premises kurulum tarafında gönderim motorunun, kurulum işleminin başarılı tamamlanması önemlidir.

Eğer mobil uygulamada push kanalı olacaksa daha önceden oalyların toplanması için eklenmiş olan SDK’mızda kanal kısmının uygulamasının da gerçekleştirilmesi gerekir. Bunun için platformda mobil uygulama tanımlarının oluşturulması neticesinde token’ların başarılı bir şekilde platforma akıp, akmadığı kontrol edilir. Ardından da test amaçlı mobile push gönderimleri yapılır.

Web Push kanalı için ise daha önce olayların web sitesi üzerinden D·engage SDK’sı ile toplanmasına yönelik yapılan uygulamaya ek olarak platformun konfigürasyon kısmında bazı alanların aktive edilmesi ve bunun sonucunda sitenize kod eklenmesi gerekir.

## 6. Training (1 ila 2 gün)

Bu bölümde tamamlanan entegrasyon neticesinde ara yüzü kullanacak olan kişilere belli başlıklarda ara yüz eğitimi verilmektedir. Bununla birlikte paralelde dokümantasyon linkleri paylaşılmaktadır.

## NOT

Tüm kurulum ve entegrasyon adımlarını, ZOHO Project alanında size açılacak olan kullanıcılar üzerinden takip edebilirsiniz. Burada verilen süreler tamamen D·engage entegrasyonunu gerçekleştirecek müşterilerinizin IT’lerinin iş planlarına göre değişkenlik gösterebilir.
