# DÂ·engage Technical Infrastructure & Architecture

## CDMP Reference Topology

# CDMP Reference Topology & Specs

*Source: CDMP-Reference Topology & Specs.pdf*


## Page 1

Dengage CDMP Full Topology

AEILET A
444444 8
Oise ss me I
MEELEEÂ®
AHiTIL

HA Cluster 1

Citus Main Machines

HA Cluster 2

- â€”â€” â€” Dmz & App Level Resources

Citus Replicas

* Resources can be increased according to the
desired capacity. This speed capacity is planned for
up to 10 million push messages per hour and up to 1
million emails and Sms messages with 2 machines in
each layer

VM 1/VM 2: (RHEL, Oracle Linux, RockyLinux8)
32CPU, 64GB RAM, 300GB SSD (For each VM)

VM 3/ VM 4: (RHEL, Oracle Linux, RockyLinux8)
2CPU, 4GB RAM, 40GB (For each VM)

VM(GRAYLOG): (RHEL, Oracle Linux, RockyLinux8)
8CPU, 32GB RAM, 300GB (For each VM)

App Level LB Definitions

LB3 - Admin Panel http-8080

LB4 - Rest AP! http:8086

LBS5 - MailEngine Panel #1 http:8087

LB6 - MailEngine Pane! #2 http:8087

LB7 - RabbitMQ Panel #1 http:15673

LB8 - RabbitMQ Panel #2 http:15673

LB9 - Local Config http:8085

LB10 - Job Schedular http:5003

LB11 - Engine SMTP tcp:3030

LB12 - RabbitMQ tcp-5672

LB13 - RabbitMQ Cluster Panel http:15672
LB14 - RabbitMQ Senders tcp:5673

LB15 - RAbbit MQ Senders Panel http:15673
ps: we will have our own HA Proxy to make these definitions

* Resources can be increased according to the
desired capacity.

DB Master / Replica:

(RHEL, Oracle Linux, RockyLinux8)
16CPU, 64GB RAM, 30GB+250GB SSD
(For each)

Citus:
(RHEL, Oracle Linux, RockyLinux8)
2CPU, 8GB RAM, 30GB+50GB SSD (For each)

HA1/HA2:
(RHEL, Oracle Linux, RockyLinux8)
2CPU, 4GB RAM, 30GB (For each)

Database Backup:
(RHEL, Oracle Linux, RockyLinux8)
4CPU, 8GB RAM, 500GB SAS

---
*Extraction method: OCR*

---

## CDMP Tokenized Sending

# CDMP Tokenized Sending

*Source: CDMP Tokenized Sending.pdf*


## Page 1

Tokenized Sending

Onur Ã–nal
Dengage

## Page 2

Turkey
Overview
This document describes the details about tokenized sending within Dengage CDMP
Platform
Goals
1. To describe how the data to be tokenized will be detected.
2. Specify how the actual value transformation of the tokenized sending at flow
execution time will be done.
3. To describe a reference implementation of a tokenization api service.
4. Describing how to define tokenization API services under settings in the panel.
5. To describe the impact of tokenization on reports and the rest of the system.
Requirement
Customers currently using the product for any of the sendings need to feed their
customers' personal data into the CDMP platform. However, the product should also be
available for customers who prefer not to store personally identifiable information data
like name, surname, email and phone numbers etc. outside their own systems. To achieve
this, email address-based token or phone number-based token must be supported.
Milestones
Firstly, tokenized sendings(email/sms send) will be detected in accounts where the related
flag is active. Then, based on these sending types, the actual values should be retrieved
corresponding to the tokenized column in the related service, and the sending should be
made to these values.
I. Detection of Tokenization Columns

## Page 3

The feature flag must be active for the tokenized sendings.
If the flag is active and the sending type is EMAIL, tokenization should be
applied to the email column. Or the sending type is SMS, tokenization should
be applied to the gsm column.
Token Formats
Email Addresses
Ensure valid email addresses are used as tokens for email validation during
imports or sending processes. These tokens simulate email addresses in the
format [tokenizedValue]@[domain], where 'tokenizedValue' can be any string
value and 'domain' can be any chosen domain name. These tokens do not
represent actual email addresses. Here are some examples for valid email
addresses;
098f6bcd4621d373cade4e832627b4f6@dengage.com
encrypteddata@customerdomain.com
xyz_1233@static.com
Phone Numbers
To meet validation criteria, phone number tokens can be any numeric
characters, limited to 20 characters, and may include the '+' symbol. Here are
some examples for valid phone numbers;
II. Data Transformation
If the flag is active, after determining the target audience to be sent through
the dEngage.BulkManager service via a DBJob and populating the relevant
temporary tables, the status of the sending in the related table should be set
to TRANSFORM_WAIT status and also the audience table name should be
written in the audience_table_name column.( If the new application is created
with new application architecture, an event will be triggered to RabbitMQ to
notify the service to begin its operations.) Then dEngage.BulkManager

|  | â– 098f6bcd4621d373cade4e832627b4f6@dengage.com |  |
| --- | --- | --- |
|  | â– encrypteddata@customerdomain.com |  |
|  | â– xyz_1233@static.com |  |
|  |  |  |
| Phone Numbers |  |  |


|  | â– 1234567890 |
| --- | --- |
|  | â– +901234567890123456789 |
|  | â– 000345345333322 |
|  |  |


## Page 4

service will not be aware of the execution of the sending until the sending
status changed it to TRANSFORMED status.
A new service will retrieve the records in 'TRANSFORM_WAIT' status from
the 'sys.email_send_order' and 'sys.sms_send_order' tables, or it will start
working after receiving the related sending event from RabbitMQ.
This new service should also contain account-specific and global sending
limits similar to dEngage.BulkManager service.
The service should change the status to 'TRANSFORMING' when it retrieves
records in 'TRANSFORM_WAIT' status.
Then, based on the table specified in the 'audience_table_name' column, it
should detect column containing tokens for email if sending is email sending
or for phone numbers if sending is sms sending.
Following that, it should collect these token details in bulk and send
tokenization API requests.
The tokenValue field which is returned from the api, should be
replaced with the value in the audience table.
If any request doesn't return a 200 status, it should be retried several
times. If errors persist after retries, the detailed error reason should
be logged, written into the related order table, and the sending status
should be set to 'FINAL_ERROR'.
If the 'audience_table' has a column like that _dcc_key, ( 'key' is a field
under the 'attributes' section in the response from the tokenization API),
these values should also be replaced. Let's assume the token API service
returns a response like the following. If there is a column named '_dcc_name'
or _dcc_surname in the audience_table, its value should be replaced with the
value provided 'value' attribute which is under the attributes array.
"processedTokens": [
"trackingId":"0f34ac64-860e-472a-9bcb-c3bc92698b8e",
"tokenValue": "onur.onal@dengage.com",
"attributes": [
"key": "name",
"value": "Onur"
"key": "surname",

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | { |  |  |  |  |  |  |  |  |  |  |  |  |
|  | "processedTokens": [ |  |  |  |  |  |  |  |  |  |  |  |  |
|  | { |  |  |  |  |  |  |  |  |  |  |  |  |
|  | "trackingId":"0f34ac64-860e-472a-9bcb-c3bc92698b8e", |  |  |  |  |  |  |  |  |  |  |  |  |
|  | "tokenValue": "onur.onal@dengage.com", |  |  |  |  |  |  |  |  |  |  |  |  |
|  | "attributes": [ |  |  |  |  |  |  |  |  |  |  |  |  |
|  | { |  |  |  |  |  |  |  |  |  |  |  |  |
|  | "key": "name", |  |  |  |  |  |  |  |  |  |  |  |  |
|  | "value": "Onur" |  |  |  |  |  |  |  |  |  |  |  |  |
|  | }, |  |  |  |  |  |  |  |  |  |  |  |  |
|  | { |  |  |  |  |  |  |  |  |  |  |  |  |
|  | "key": "surname", |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |


## Page 5

"value": "Onal"
"unprocessedTokens": []
After scanning the entire audience table and performing the transformation,
the status of the related sending status should be changed to
'TRANSFORMED'.
After all of these steps, dEngage.BulkManager will continue to perform its
own business as is when the sending is in 'TRANSFORMED' status.
III. Implementation of Tokenization API
A tokenization API will be developed as a reference for our tenants to utilize.
Two types of APIs are supported, either in JSON format or in gzip format
(recommended).
The API supports HTTP Basic Auth or API Key authorization.
A username and password passes through using the authorization
header for basic authentication. Our tenants can use SSL connection
to encrypt username or password.
For api key authorization, key and value should be passed through the
request header.
The API processes batches of up to 10.000 tokens per request and returns a
response within 90 seconds.
Request Body
Request Body should contain following specific properties
"tokens": [
"trackingId":"02c6cc4b-dc5a-4a3d-b841-7d484227bc98",

|  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | "value": "Onal" |  |  |  |  |  |  |  |  |
|  | } |  |  |  |  |  |  |  |  |
|  | ] |  |  |  |  |  |  |  |  |
|  | } |  |  |  |  |  |  |  |  |
|  | ], |  |  |  |  |  |  |  |  |
|  | "unprocessedTokens": [] |  |  |  |  |  |  |  |  |
|  | } |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |


|  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
|  | { |  |  |  |  |  |
|  | "tokens": [ |  |  |  |  |  |
|  | { |  |  |  |  |  |
|  | "trackingId":"02c6cc4b-dc5a-4a3d-b841-7d484227bc98", |  |  |  |  |  |
|  |  |  |  |  |  |  |


## Page 6

"token":"098f6bcd4621d373cade4e832627b4f6@dengage.com",
"tokenCorrelationKey":"contact_key_xyz"
"trackingId":"85fc1b8a-93b8-43f8-a95a-acab62e9862e",
"token":"xyz_123@static.com",
"tokenCorrelationKey":"contact_key_abc"
"sendAssociationKey": "EMAIL_SEND-123"
tokens: it contains an array of token objects. It is a mandatory field.
trackingId: UUID generated by related service per token. It is a mandatory
field.
token: email address or phone number token to process. It is a mandatory
field.
tokenCorrelationKey: is an identifier to associate related pieces of
information within our tenant system. The values within the 'contact_key'
column in the 'master_contact' table will be passed to the endpoint. It is a
mandatory field.
sendAssociationKey: it will be used to associate the API request made with
the sending. The service calling the endpoint will pass the key like SendType-
SendId.
Response Body
Response Body should contain following specific properties
"processedTokens": [
"trackingId": "02c6cc4b-dc5a-4a3d-b841-7d484227bc98",
"tokenValue": "onur.onal@dengage.com",
"attributes": [
"key": "name",
"value": "Onur"

|  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | "token":"098f6bcd4621d373cade4e832627b4f6@dengage.com", |  |  |  |  |  |  |  |  |  |  |
|  | "tokenCorrelationKey":"contact_key_xyz" |  |  |  |  |  |  |  |  |  |  |
|  | }, |  |  |  |  |  |  |  |  |  |  |
|  | { |  |  |  |  |  |  |  |  |  |  |
|  | "trackingId":"85fc1b8a-93b8-43f8-a95a-acab62e9862e", |  |  |  |  |  |  |  |  |  |  |
|  | "token":"xyz_123@static.com", |  |  |  |  |  |  |  |  |  |  |
|  | "tokenCorrelationKey":"contact_key_abc" |  |  |  |  |  |  |  |  |  |  |
|  | } |  |  |  |  |  |  |  |  |  |  |
|  | ], |  |  |  |  |  |  |  |  |  |  |
|  | "sendAssociationKey": "EMAIL_SEND-123" |  |  |  |  |  |  |  |  |  |  |
|  | } |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |


|  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | { |  |  |  |  |  |  |  |  |  |  |  |
|  | "processedTokens": [ |  |  |  |  |  |  |  |  |  |  |  |
|  | { |  |  |  |  |  |  |  |  |  |  |  |
|  | "trackingId": "02c6cc4b-dc5a-4a3d-b841-7d484227bc98", |  |  |  |  |  |  |  |  |  |  |  |
|  | "tokenValue": "onur.onal@dengage.com", |  |  |  |  |  |  |  |  |  |  |  |
|  | "attributes": [ |  |  |  |  |  |  |  |  |  |  |  |
|  | { |  |  |  |  |  |  |  |  |  |  |  |
|  | "key": "name", |  |  |  |  |  |  |  |  |  |  |  |
|  | "value": "Onur" |  |  |  |  |  |  |  |  |  |  |  |
|  | }, |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  |


## Page 7

"key": "surname",
"value": "Onal"
"unprocessedTokens": [
"trackingId": "85fc1b8a-93b8-43f8-a95a-acab62e9862e",
"message": "Error occurred while getting detail about the token"
processedTokens: it contains an array of processed token objects. It is a
mandatory field.
trackingId: UUID generated by related service per token during the request.
It is a mandatory field.
tokenValue: processed email address or phone number. It is a mandatory
field.
attributes: key and value pairs representing an array of attributes linked to
the processed email address or phone number. It is a mandatory field.
* If attributes are being used, all records must return the same attributes.
The attributes from the first successful request are considered as the
reference, and any records that do not conform to this reference are
considered unprocessed.
unprocessedTokens: it contains an array of unprocessed token objects. It is
a mandatory field.
message: the error message explaining why the token remains unprocessed.
It is an optional field
IV. Tokenization API Definition
You can access the sample API from here.

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | { |  |  |  |  |  |  |  |  |  |  |  |  |
|  | "key": "surname", |  |  |  |  |  |  |  |  |  |  |  |  |
|  | "value": "Onal" |  |  |  |  |  |  |  |  |  |  |  |  |
|  | } |  |  |  |  |  |  |  |  |  |  |  |  |
|  | ] |  |  |  |  |  |  |  |  |  |  |  |  |
|  | } |  |  |  |  |  |  |  |  |  |  |  |  |
|  | ], |  |  |  |  |  |  |  |  |  |  |  |  |
|  | "unprocessedTokens": [ |  |  |  |  |  |  |  |  |  |  |  |  |
|  | { |  |  |  |  |  |  |  |  |  |  |  |  |
|  | "trackingId": "85fc1b8a-93b8-43f8-a95a-acab62e9862e", |  |  |  |  |  |  |  |  |  |  |  |  |
|  | "message": "Error occurred while getting detail about the token" |  |  |  |  |  |  |  |  |  |  |  |  |
|  | } |  |  |  |  |  |  |  |  |  |  |  |  |
|  | ] |  |  |  |  |  |  |  |  |  |  |  |  |
|  | } |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |


## Page 8

If the flag is active, a new link named 'Tokenization API Definition' will be
added under Settings -> Campaign Configurations in the admin panel.
If the gzip format (recommended) is used, the request and response should
be developed in accordance with gzip as follows:
For the request and response:
Set the header "Content-Encoding" to "gzip".
Set the header "Content-Type" to "application/octet-stream".
This ensures that both the request and response are properly encoded and
decoded using gzip compression.
The page opened via the link will allow the user to type the tokenization API
Url and rest of the details.
If the basic authentication type is selected, username, and password
should be provided.
If api key type is selected, key and value via the header should be
provided.
If these details have been previously saved in the system, the current values
will be displayed to the user (excluding password or value).
Users can update any of the fields on definition detail page.

## Page 9

V. Tokenizations Effect on the System
Segmentation should not be performed based on columns stored as
tokenized data. The actual values of these fields are unknown during
segmentation calculations.
Domain Distribution report and Top Domain information in the Email
Send Report cannot be provided as the actual values of the email column
are not known by the system.
There's no issue about events received in tokenized email or sms sendings.
The relation between events and messages is provided through contact_id
field. No need to make any additional developments.

---
*Extraction method: pdfplumber*

---

## CDMP OpenShift Services

# CDMP Openshift Service Descriptions

*Source: CDMP Openshift Service Descriptions.pdf*


## Page 1

CDMP Service Descriptions
Automation Manager Service
Description Automation manager service manages automated jobs
and campaigns for example send or imports or exports
Installed on machine sender01
listen on port -
Work with these service(s)
global_config module_name dEngage.Automation.Manager
service name automationmanager
install path /dengage/automationmanager
setting file path no
log config file path /dengage_config/automationmanager.nlog.config
file log path /var/log/dengage/automationmanager/
has readmd file yes
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.automationmanager.git
integrated with appveyor yes
idempotent no
need internet access no
accessible from outside no
Automation Audience Manager Service
Description
This service prepare data step on one time or recurring campaign and also responsible for
random split , decision split and engagement split nodes data work.
TargetAudience
Engagement Split
Random Split
Decision Split
Join
Finish
Servis genel olarak ÅŸu ÅŸekilde Ã§alÄ±ÅŸÄ±r.
Page 1

| Automation Manager Service |  |
| --- | --- |
| Description | Automation manager service manages automated jobs and campaigns for example send or imports or exports |
| Installed on machine | sender01 |
| listen on port | - |
| Work with these service(s) |  |
| global_config module_name | dEngage.Automation.Manager |
| service name | automationmanager |
| install path | /dengage/automationmanager |
| setting file path | no |
| log config file path | /dengage_config/automationmanager.nlog.config |
| file log path | /var/log/dengage/automationmanager/ |
| has readmd file | yes |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.automationmanager.git |
| integrated with appveyor | yes |
| idempotent | no |
| need internet access | no |
| accessible from outside | no |


| Automation Audience Manager Service |
| --- |
| Description This service prepare data step on one time or recurring campaign and also responsible for random split , decision split and engagement split nodes data work. TargetAudience Engagement Split Random Split Decision Split Join Finish Servis genel olarak ÅŸu ÅŸekilde Ã§alÄ±ÅŸÄ±r. |


## Page 2

CDMP Service Descriptions
sys.automation_audience_order tablosundan NEW statÃ¼sÃ¼nde bir kaydÄ± Ã§ekerek
PROCESSINGe set eder.
Hata alÄ±nan iÅŸlemler iÃ§in bu tablodaki statusÃ¼ ERROR olarak, baÅŸaralÄ± biten iÅŸlemler iÃ§in
ise COMPLETED olarak update eder.
Target Audience: Kampanya ekranÄ±nda seÃ§ilen kitleyi segment servisini kullanarak
Ã§alÄ±ÅŸtÄ±rÄ±r, elde edilen sql sonucunu kullanrak Contact ve Anonymous device olarak 2 fark
farklÄ± tablo create eder. Bu tablolar kampanya ekranÄ±ndaki Contact ve Anonymous Device
kollarÄ±nÄ± besler.Bu kollar Ã¼zerinde yapÄ±lacak olan iÅŸlemlerde data kaynaÄŸÄ± oluÅŸturulan bu
tablolar olacaktÄ±r.
Engagement Split: Ã–ncesinde yapÄ±lan bir gÃ¶nderim iÃ§in Open,Click,Delivery eventlerine
gÃ¶re bu kriterlere uyanlarÄ± ve uymayanlarÄ± ayÄ±rÄ±p bu kitlelere uyanlarÄ± ve uymayanlarÄ± iki
yeni tabloda oluÅŸturarak bir sonraki adÄ±mda kullanÄ±labilmelerini saÄŸlar.(Bir Ã¶nceki emailde
okuma sinyali gelenler ve gelmeyenlerin ayrÄ±lmasÄ±nÄ± Ã¶rnek verebiliriz)
Random Split: KullanÄ±ldÄ±ÄŸÄ± koldaki kaynak tabloyu birden fazla parÃ§aya verilen % lik
oranlara gÃ¶re daÄŸÄ±tÄ±r.
Decision Split:KullanÄ±ldÄ±ÄŸÄ± koldaki kitleyi verilen segmente gÃ¶re bu segmentde varolanlar
ve olmayanlar olarak iki farklÄ± tablo halinde oluÅŸturur.
Join: SeÃ§ilen birden fazla nodedan gelecek olan kitleyi tek ve yeni bir tablo olarak
oluÅŸturabilir. Bir join sadece contact yada sadece anonymous device kitlelerini
birleÅŸtirebilir.
End : Herhangi bir nodeun sonuna koyularak buradaki iÅŸin tamamlandÄ±ÄŸÄ±nÄ± ifade eder.
Installed on machine sender01
listen on port -
Work with these service(s) -
global_config module_name automation.audience.manager
service name automationaudiencemanager.service
install path /dengage/automationaudiencemanager/
setting file path no
log config file path /dengage_config/automationaudiencemanager.nlog.confi
file log path /var/log/dengage/automationaudiencemanager/
has readmd file yes
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.automation.audience.manager.git
integrated with appveyor yes
Page 2

| sys.automation_audience_order tablosundan NEW statÃ¼sÃ¼nde bir kaydÄ± Ã§ekerek PROCESSINGâ€™e set eder. Hata alÄ±nan iÅŸlemler iÃ§in bu tablodaki statusâ€™Ã¼ ERROR olarak, baÅŸaralÄ± biten iÅŸlemler iÃ§in ise COMPLETED olarak update eder. Target Audience: Kampanya ekranÄ±nda seÃ§ilen kitleyi segment servisini kullanarak Ã§alÄ±ÅŸtÄ±rÄ±r, elde edilen sql sonucunu kullanrak Contact ve Anonymous device olarak 2 fark farklÄ± tablo create eder. Bu tablolar kampanya ekranÄ±ndaki Contact ve Anonymous Device kollarÄ±nÄ± besler.Bu kollar Ã¼zerinde yapÄ±lacak olan iÅŸlemlerde data kaynaÄŸÄ± oluÅŸturulan bu tablolar olacaktÄ±r. Engagement Split: Ã–ncesinde yapÄ±lan bir gÃ¶nderim iÃ§in Open,Click,Delivery eventlerine gÃ¶re bu kriterlere uyanlarÄ± ve uymayanlarÄ± ayÄ±rÄ±p bu kitlelere uyanlarÄ± ve uymayanlarÄ± iki yeni tabloda oluÅŸturarak bir sonraki adÄ±mda kullanÄ±labilmelerini saÄŸlar.(Bir Ã¶nceki emailâ€™de okuma sinyali gelenler ve gelmeyenlerin ayrÄ±lmasÄ±nÄ± Ã¶rnek verebiliriz) Random Split: KullanÄ±ldÄ±ÄŸÄ± koldaki kaynak tabloyu birden fazla parÃ§aya verilen % lik oranlara gÃ¶re daÄŸÄ±tÄ±r. Decision Split:KullanÄ±ldÄ±ÄŸÄ± koldaki kitleyi verilen segmentâ€™e gÃ¶re bu segmentâ€™de varolanlar ve olmayanlar olarak iki farklÄ± tablo halinde oluÅŸturur. Join: SeÃ§ilen birden fazla nodeâ€™dan gelecek olan kitleyi tek ve yeni bir tablo olarak oluÅŸturabilir. Bir join sadece contact yada sadece anonymous device kitlelerini birleÅŸtirebilir. End : Herhangi bir nodeâ€™un sonuna koyularak buradaki iÅŸin tamamlandÄ±ÄŸÄ±nÄ± ifade eder. |  |
| --- | --- |
| Installed on machine | sender01 |
| listen on port | - |
| Work with these service(s) | - |
| global_config module_name | automation.audience.manager |
| service name | automationaudiencemanager.service |
| install path | /dengage/automationaudiencemanager/ |
| setting file path | no |
| log config file path | /dengage_config/automationaudiencemanager.nlog.confi |
| file log path | /var/log/dengage/automationaudiencemanager/ |
| has readmd file | yes |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.automation.audience.manager.git |
| integrated with appveyor | yes |


## Page 3

CDMP Service Descriptions
idempotent no
need internet access no
accessible from outside no
Bulkmanager Service
Description
Bulkmanager service prepare send audience and pre process send content for
customization and put prepared audience data to rabbitmq for customization and relaying
AyrÄ±ca seÃ§ilen kitleden random 3 farklÄ± contact veya device iÃ§in seÃ§ilen content ile birlikte
customization iÅŸlerini gerÃ§ekleÅŸtirerek olasÄ± gÃ¶nderim hatalarÄ± yada content iÃ§erisinde js
kullanÄ±mÄ± ile sisteme yapÄ±labilecek kÃ¶tÃ¼ye kullanÄ±mlarÄ±n Ã¶nÃ¼ne geÃ§meyi amaÃ§lar
Bulkmanager gÃ¶nderileri sys ÅŸemasÄ± altÄ±ndaki email_send_order
sms_send_order
push_send_order tablolarÄ±ndan select ederek baÅŸlatÄ±r.
Herhangi bir ÅŸekilde error alan send toplamda 3 kez tekrar edildikten sonra
FINAL_ERROR statÃ¼sÃ¼nde sonlandÄ±rÄ±lÄ±r.
Bir gÃ¶nderim bulkmanagerda prepared statuse alÄ±ndÄ±ktan sonra fqmanager tarafÄ±ndan
Fair queuing mantÄ±ÄŸÄ± ile shared rabbitmq queuelarÄ±na taÅŸÄ±nÄ±r.
Installed on machine app01
listen on port -
Work with these service(s)
global_config module_name bm
service name bulkmanager
install path /dengage/bulkmanager
setting file path no
log config file path /dengage_config/bm.nlog.config
file log path /var/log/dengage/bulkmanager/
has readmd file yes
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.bulkmanager.git
integrated with appveyor yes
Page 3

| idempotent | no |
| --- | --- |
| need internet access | no |
| accessible from outside | no |


| Bulkmanager Service |  |
| --- | --- |
| Description Bulkmanager service prepare send audience and pre process send content for customization and put prepared audience data to rabbitmq for customization and relaying AyrÄ±ca seÃ§ilen kitleden random 3 farklÄ± contact veya device iÃ§in seÃ§ilen content ile birlikte customization iÅŸlerini gerÃ§ekleÅŸtirerek olasÄ± gÃ¶nderim hatalarÄ± yada content iÃ§erisinde js kullanÄ±mÄ± ile sisteme yapÄ±labilecek kÃ¶tÃ¼ye kullanÄ±mlarÄ±n Ã¶nÃ¼ne geÃ§meyi amaÃ§lar Bulkmanager gÃ¶nderileri sys ÅŸemasÄ± altÄ±ndaki email_send_order sms_send_order push_send_order tablolarÄ±ndan select ederek baÅŸlatÄ±r. Herhangi bir ÅŸekilde error alan send toplamda 3 kez tekrar edildikten sonra FINAL_ERROR statÃ¼sÃ¼nde sonlandÄ±rÄ±lÄ±r. Bir gÃ¶nderim bulkmanagerâ€™da prepared statusâ€™e alÄ±ndÄ±ktan sonra fqmanager tarafÄ±ndan Fair queuing mantÄ±ÄŸÄ± ile shared rabbitmq queueâ€™larÄ±na taÅŸÄ±nÄ±r. |  |
| Installed on machine | app01 |
| listen on port | - |
| Work with these service(s) |  |
| global_config module_name | bm |
| service name | bulkmanager |
| install path | /dengage/bulkmanager |
| setting file path | no |
| log config file path | /dengage_config/bm.nlog.config |
| file log path | /var/log/dengage/bulkmanager/ |
| has readmd file | yes |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.bulkmanager.git |
| integrated with appveyor | yes |


## Page 4

CDMP Service Descriptions
idempotent no
need internet access no
accessible from outside no
Fq Manager Service
Description
Fqmanager service is make fair queuing for the campaign which has A-B optimization or
Hourly capping.
Data taÅŸÄ±ma iÅŸlemini dakikalÄ±k periyotlar ile yaparak konfigÃ¼rasyon parametresinden
okuduÄŸu dakikalÄ±k maksimum taÅŸÄ±ma deÄŸerini aktif gÃ¶nderimlerin sayÄ±sÄ±na bÃ¶lerek
hesaplamalar yapar.
Bu iÅŸlemi yaparken varsa eÄŸer A/B testing ve saatlik gÃ¶nderim limiti parametrelerini de gÃ¶z
Ã¶nÃ¼nde bulundurur.
Genel olarak order tablolarÄ±nda aÅŸaÄŸÄ±daki statulerde bulunan sendleri select eder.
'PREPARED', 'POOLING','OPT_WAITING','RELAYING'
Installed on machine app01
listen on port -
Work with these service(s)
global_config module_name fq
service name fqmanager
install path /dengage/fqmanager
setting file path no
log config file path /dengage_config/fq.nlog.config
file log path /var/log/dengage/fqmanager/
has readmd file yes
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.fqmanager.git
integrated with appveyor yes
idempotent no
need internet access no
Page 4

| idempotent | no |
| --- | --- |
| need internet access | no |
| accessible from outside | no |


| Fq Manager Service |  |
| --- | --- |
| Description Fqmanager service is make fair queuing for the campaign which has A-B optimization or Hourly capping. Data taÅŸÄ±ma iÅŸlemini dakikalÄ±k periyotlar ile yaparak konfigÃ¼rasyon parametresinden okuduÄŸu dakikalÄ±k maksimum taÅŸÄ±ma deÄŸerini aktif gÃ¶nderimlerin sayÄ±sÄ±na bÃ¶lerek hesaplamalar yapar. Bu iÅŸlemi yaparken varsa eÄŸer A/B testing ve saatlik gÃ¶nderim limiti parametrelerini de gÃ¶z Ã¶nÃ¼nde bulundurur. Genel olarak order tablolarÄ±nda aÅŸaÄŸÄ±daki statulerde bulunan sendâ€™leri select eder. 'PREPARED', 'POOLING','OPT_WAITING','RELAYING' |  |
| Installed on machine | app01 |
| listen on port | - |
| Work with these service(s) |  |
| global_config module_name | fq |
| service name | fqmanager |
| install path | /dengage/fqmanager |
| setting file path | no |
| log config file path | /dengage_config/fq.nlog.config |
| file log path | /var/log/dengage/fqmanager/ |
| has readmd file | yes |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.fqmanager.git |
| integrated with appveyor | yes |
| idempotent | no |
| need internet access | no |


## Page 5

CDMP Service Descriptions
accessible from outside no
BulkCustomizer Service
Description
BulkCustomizer service is listen rabbitmq and if there is a message for send just prepare
message payload (pushPayload or Email mime etc) and put this message to rabbitmq
again for send over mmp or pushsender services.
Email, sms ve push rabbitmq poollarÄ±ndan sÃ¼rekli olarak mesajlarÄ± alarak ilgili sendin tÃ¼m
gÃ¶nderim parametrelerini bir cache mekanizmasÄ±nda tutar ve kiÅŸiÅŸelleÅŸtirme iÅŸlemini
yapar. KiÅŸiselleÅŸtirme iÅŸlerini yaparken send Ã¶zelinde A/B testing varsa content seÃ§iminde
bunu gÃ¶zÃ¶nÃ¼nde bulundurur.
Bir gÃ¶nderim eÄŸer hazÄ±rlÄ±k aÅŸamalarÄ±ndan herhangi birinde hata alÄ±rsa temp_error ile
baÅŸlayan ilgili geÃ§ici error rabbitmq queuesuna yazÄ±larak pas geÃ§ilir.
Temp error ile baÅŸlayan queuelar ErrorManager servisi ile taranarak retry zamanÄ± gelenler
tekrar ilgili queuelara taÅŸÄ±narak BulkCustomizer tarafÄ±ndan hazÄ±rlanmaya Ã§alÄ±ÅŸÄ±lÄ±r. 3 kez
hata alan mesajlar perm_error ile baÅŸlayan queuelara yazÄ±larak daha sonra
Eventmanager servisi tarafÄ±nda ilgili sende Error olarak raporlanmasÄ± saÄŸlanÄ±r
Installed on machine Sender01,Sender02
listen on port -
Work with these service(s)
global_config module_name BulkCustomizer
service name bulkcustomizer0,1,2,3,4
install path /dengage/bulkcustomizer
setting file path dengage_config/bulkcustomizer.settings.json
log config file path /dengage_config/bulkcustomizer.nlog.config
file log path /var/log/dengage/bulkcustomizer/
has readmd file no
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.bulkcustomizer.git
integrated with appveyor yes
idempotent yes
need internet access yes
Page 5

| BulkCustomizer Service |  |
| --- | --- |
| Description BulkCustomizer service is listen rabbitmq and if there is a message for send just prepare message payload (pushPayload or Email mime etc) and put this message to rabbitmq again for send over mmp or pushsender services. Email, sms ve push rabbitmq poolâ€™larÄ±ndan sÃ¼rekli olarak mesajlarÄ± alarak ilgili sendâ€™in tÃ¼m gÃ¶nderim parametrelerini bir cache mekanizmasÄ±nda tutar ve kiÅŸiÅŸelleÅŸtirme iÅŸlemini yapar. KiÅŸiselleÅŸtirme iÅŸlerini yaparken send Ã¶zelinde A/B testing varsa content seÃ§iminde bunu gÃ¶zÃ¶nÃ¼nde bulundurur. Bir gÃ¶nderim eÄŸer hazÄ±rlÄ±k aÅŸamalarÄ±ndan herhangi birinde hata alÄ±rsa temp_error ile baÅŸlayan ilgili geÃ§ici error rabbitmq queueâ€™suna yazÄ±larak pas geÃ§ilir. Temp error ile baÅŸlayan queueâ€™lar ErrorManager servisi ile taranarak retry zamanÄ± gelenler tekrar ilgili queueâ€™lara taÅŸÄ±narak BulkCustomizer tarafÄ±ndan hazÄ±rlanmaya Ã§alÄ±ÅŸÄ±lÄ±r. 3 kez hata alan mesajlar perm_error ile baÅŸlayan queueâ€™lara yazÄ±larak daha sonra Eventmanager servisi tarafÄ±nda ilgili sendâ€™e Error olarak raporlanmasÄ± saÄŸlanÄ±r |  |
| Installed on machine | Sender01,Sender02 |
| listen on port | - |
| Work with these service(s) |  |
| global_config module_name | BulkCustomizer |
| service name | bulkcustomizer0,1,2,3,4 |
| install path | /dengage/bulkcustomizer |
| setting file path | dengage_config/bulkcustomizer.settings.json |
| log config file path | /dengage_config/bulkcustomizer.nlog.config |
| file log path | /var/log/dengage/bulkcustomizer/ |
| has readmd file | no |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.bulkcustomizer.git |
| integrated with appveyor | yes |
| idempotent | yes |
| need internet access | yes |


## Page 6

CDMP Service Descriptions
accessible from outside no
EventManager Service
Description
Eventmanager service is responsible for processing email,sms,push events and put these
events to database for reporting
Email,Sms ve Push iÃ§in ayrÄ± threadler Ã§alÄ±ÅŸarak rabbit-mq servisinde var olan event
yazÄ±lan queuelarÄ± tarayarak varsa bulduÄŸu event objeleri iÃ§in iÅŸlemler gerÃ§ekleÅŸtirir.
Event manager istisna olarak push gÃ¶nderimlerinin Delivered eventleri iÃ§in send_id ve
app_id bazÄ±nda total olarak rabbitmqya yazÄ±lan push delivered raporlarÄ±nÄ± ilgili accountun
sys_push_send_stats tablosuna update iÅŸlemi yaparak yazar.
Genel olarak eventmanager servisinin rabbit-mq Ã¼zerinde dinlediÄŸi queue isimleri
aÅŸaÄŸÄ±daki gibidir.
event-email; portmta-sms-event; event-sms; event-push; event-portmta-push;
transactional-event-push; event-custom-message; perm-err-email-pool;
perm-err-push-pool; perm-err-sms-pool; perm-err-custom-message-pool;
event-dengage-push;
Installed on machine app01
listen on port -
Work with these service(s)
global_config module_name em
service name eventmanager
install path /dengage/eventmanager
setting file path /dengage_config/eventmanager.appsettings.json
log config file path /dengage_config/eventmanager.nlog.config
file log path /var/log/dengage/eventmanager/
has readmd file yes
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.eventmanager.git
integrated with appveyor yes
idempotent yes
Page 6

| EventManager Service |  |
| --- | --- |
| Description Eventmanager service is responsible for processing email,sms,push events and put these events to database for reporting Email,Sms ve Push iÃ§in ayrÄ± threadâ€™ler Ã§alÄ±ÅŸarak rabbit-mq servisinde var olan event yazÄ±lan queueâ€™larÄ± tarayarak varsa bulduÄŸu event objeleri iÃ§in iÅŸlemler gerÃ§ekleÅŸtirir. Event manager istisna olarak push gÃ¶nderimlerinin Delivered eventleri iÃ§in send_id ve app_id bazÄ±nda total olarak rabbitmqâ€™ya yazÄ±lan push delivered raporlarÄ±nÄ± ilgili accountâ€™un sys_push_send_stats tablosuna update iÅŸlemi yaparak yazar. Genel olarak eventmanager servisinin rabbit-mq Ã¼zerinde dinlediÄŸi queue isimleri aÅŸaÄŸÄ±daki gibidir. event-email; portmta-sms-event; event-sms; event-push; event-portmta-push; transactional-event-push; event-custom-message; perm-err-email-pool; perm-err-push-pool; perm-err-sms-pool; perm-err-custom-message-pool; event-dengage-push; |  |
| Installed on machine | app01 |
| listen on port | - |
| Work with these service(s) |  |
| global_config module_name | em |
| service name | eventmanager |
| install path | /dengage/eventmanager |
| setting file path | /dengage_config/eventmanager.appsettings.json |
| log config file path | /dengage_config/eventmanager.nlog.config |
| file log path | /var/log/dengage/eventmanager/ |
| has readmd file | yes |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.eventmanager.git |
| integrated with appveyor | yes |
| idempotent | yes |


## Page 7

CDMP Service Descriptions
need internet access no
accessible from outside no
Js Engine
Description JsEngine service is responsible for customizing
messages using with Chakra Javascript Engine.
Bu servis ayrÄ±ca content iÃ§erisinde bulunan Ã¶zel
keywordlerden yola Ã§Ä±karak veritabanÄ±na eriÅŸerek query
Ã§alÄ±ÅŸtÄ±rmak
DÄ±ÅŸ dÃ¼nyaya baÄŸlantÄ± kurarak bir urle GET yaparak data
Ã§ekmek (ve bu datayÄ± content iÃ§erisinde kullandÄ±rabilmek)
AyrÄ±ca Segmentify iÃ§in yapÄ±lan Ã¶zel entegrasyon ile
segmentify tarafÄ±ndan recommendation datasÄ±nÄ± Ã§ekmek
gibi iÅŸlemleri de gerÃ§ekleÅŸtirebilir.
Installed on machine app01,panel01,panel02,rest01,rest02,sender01,sender0
listen on port 8041
Work with these service(s)
global_config module_name CustomizerService
service name customizerservice.service
install path /dengage/customizer_service/
setting file path /dengage_config/customizer.settings.json
log config file path /dengage_config/customizer.nlog.config
file log path /var/log/dengage/customizerservice/
has readmd file yes
repository link http://bucket.whitehorse.technology:7990/scm/com/deng
age.customizer.git
integrated with appveyor yes
idempotent yes
need internet access yes
Page 7

| need internet access | no |
| --- | --- |
| accessible from outside | no |
|  |  |


| Js Engine |  |
| --- | --- |
| Description | JsEngine service is responsible for customizing messages using with Chakra Javascript Engine. Bu servis ayrÄ±ca content iÃ§erisinde bulunan Ã¶zel keywordâ€™lerden yola Ã§Ä±karak veritabanÄ±na eriÅŸerek query Ã§alÄ±ÅŸtÄ±rmak DÄ±ÅŸ dÃ¼nyaya baÄŸlantÄ± kurarak bir urlâ€™e GET yaparak data Ã§ekmek (ve bu datayÄ± content iÃ§erisinde kullandÄ±rabilmek) AyrÄ±ca Segmentify iÃ§in yapÄ±lan Ã¶zel entegrasyon ile segmentify tarafÄ±ndan recommendation datasÄ±nÄ± Ã§ekmek gibi iÅŸlemleri de gerÃ§ekleÅŸtirebilir. |
| Installed on machine | app01,panel01,panel02,rest01,rest02,sender01,sender0 2 |
| listen on port | 8041 |
| Work with these service(s) |  |
| global_config module_name | CustomizerService |
| service name | customizerservice.service |
| install path | /dengage/customizer_service/ |
| setting file path | /dengage_config/customizer.settings.json |
| log config file path | /dengage_config/customizer.nlog.config |
| file log path | /var/log/dengage/customizerservice/ |
| has readmd file | yes |
| repository link | http://bucket.whitehorse.technology:7990/scm/com/deng age.customizer.git |
| integrated with appveyor | yes |
| idempotent | yes |
| need internet access | yes |


## Page 8

CDMP Service Descriptions
accessible from outside no
Datauploader Service
Description Datauploader service is manage data uploads from
adminpanel or sftp file upload
Processing those files and insert file content into a
database.
Also datauploader do the getting data from remote
sources job, Connection to Amazon Redshifti Google
bigquery, Mssql or Oracle database services and retrive
data to dEngage database
Installed on machine app01
listen on port -
Work with these service(s)
global_config module_name dwh
service name datauploader
install path /dengage/datauploader
setting file path no
log config file path /dengage_config/datauploader.nlog.config
file log path /var/log/dengage/datauploader/
has readmd file yes
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.datauploader.git
integrated with appveyor yes
idempotent no
need internet access no
accessible from outside yes with file comes from outside
ErrorManager Service
Page 8

| accessible from outside | no |
| --- | --- |
|  |  |


| Datauploader Service |  |
| --- | --- |
| Description | Datauploader service is manage data uploads from adminpanel or sftp file upload Processing those files and insert file content into a database. Also datauploader do the getting data from remote sources job, Connection to Amazon Redshifti Google bigquery, Mssql or Oracle database services and retrive data to dEngage database |
| Installed on machine | app01 |
| listen on port | - |
| Work with these service(s) |  |
| global_config module_name | dwh |
| service name | datauploader |
| install path | /dengage/datauploader |
| setting file path | no |
| log config file path | /dengage_config/datauploader.nlog.config |
| file log path | /var/log/dengage/datauploader/ |
| has readmd file | yes |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.datauploader.git |
| integrated with appveyor | yes |
| idempotent | no |
| need internet access | no |
| accessible from outside | yes with file comes from outside |


## Page 9

CDMP Service Descriptions
Description Errormanager service has 3 diffrent thread
1.QueueErrorManager move messages from temp_error
to original rabbitmq queues when if retry time is coming
2.SendQueueRemover delete rabbitmq queues for
completed,errored or paused (after 24 hour) sends
3.IndexCleaner delete expired messages from
elasticsearch for custom message channel
Installed on machine app01
listen on port -
Work with these service(s)
global_config module_name errorManager-sendQueueRemover-
service name errormanager
install path /dengage/errormanager
setting file path no
log config file path /dengage_config/errormanager.nlog.config
file log path /var/log/dengage/errormanager/
has readmd file yes
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.error.manager.git
integrated with appveyor yes
idempotent no
need internet access no
accessible from outside yes with open/click event file
Utils Manager Service
Description Utilsmanager service is prepared image thumbnail for
email channels
Select edilen kayÄ±t iÃ§in nodeJs ile yazÄ±lan nodeUtils
servisine bir http istek yapar ve gÃ¶nderilen content iÃ§in
thumbnail oluÅŸturulmasÄ± iÅŸlemini gerÃ§ekleÅŸtirir
NodeUtils servisinden geriye dÃ¶nen responseu select
Page 9

| Description | Errormanager service has 3 diffrent thread 1.QueueErrorManager move messages from temp_error to original rabbitmq queues when if retry time is coming 2.SendQueueRemover delete rabbitmq queues for completed,errored or paused (after 24 hour) sends 3.IndexCleaner delete expired messages from elasticsearch for custom message channel |
| --- | --- |
| Installed on machine | app01 |
| listen on port | - |
| Work with these service(s) |  |
| global_config module_name | errorManager-sendQueueRemover- |
| service name | errormanager |
| install path | /dengage/errormanager |
| setting file path | no |
| log config file path | /dengage_config/errormanager.nlog.config |
| file log path | /var/log/dengage/errormanager/ |
| has readmd file | yes |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.error.manager.git |
| integrated with appveyor | yes |
| idempotent | no |
| need internet access | no |
| accessible from outside | yes with open/click event file |


| Utils Manager Service |  |
| --- | --- |
| Description | Utilsmanager service is prepared image thumbnail for email channels Select edilen kayÄ±t iÃ§in nodeJs ile yazÄ±lan nodeUtils servisine bir http istek yapar ve gÃ¶nderilen content iÃ§in thumbnail oluÅŸturulmasÄ± iÅŸlemini gerÃ§ekleÅŸtirir NodeUtils servisinden geriye dÃ¶nen responseâ€™u select |


## Page 10

CDMP Service Descriptions
ettiÄŸi satÄ±r iÃ§in update ederek byte[] tipinde saklayarak
hazÄ±rlanan gÃ¶nderim templatelerini thumbnail imagelarÄ±
oluÅŸturulmasÄ± iÅŸlemini saÄŸlar.
Herhangi bir ÅŸekilde error alan satÄ±r 3 kez retry edilerek
iÅŸlemin baÅŸarÄ±lÄ± tamamlanmasÄ± hedeflenir.
Installed on machine app01
listen on port -
Work with these service(s)
global_config module_name Utils
service name utilsmanager.service
install path /dengage/utilsmanager/
setting file path -
log config file path /dengage_config/utilsmanager.nlog.config
file log path /var/log/dengage/utilsmanager
has readmd file yes
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.utilsmanager.git
integrated with appveyor yes
idempotent no
need internet access no
accessible from outside no
JmrpService
Description Jmrp service is getting email record from special gmail
inbox and process this mails for junk email reporting
purposes.
Bu header email client tarafÄ±ndan spam iÅŸaretlenen mail
adresinden belirtilen gmail adresine bir email gÃ¶nderimi
yapÄ±lmasÄ±nÄ± saÄŸlar, bu ÅŸekilde spam iÅŸaretleyen
kullanÄ±cÄ±larÄ±n kim olduÄŸu ve spam raporlama iÅŸlemi
yapÄ±lmÄ±ÅŸ olur.
Page 10

|  | ettiÄŸi satÄ±r iÃ§in update ederek byte[] tipinde saklayarak hazÄ±rlanan gÃ¶nderim templateâ€™lerini thumbnail imageâ€™larÄ± oluÅŸturulmasÄ± iÅŸlemini saÄŸlar. Herhangi bir ÅŸekilde error alan satÄ±r 3 kez retry edilerek iÅŸlemin baÅŸarÄ±lÄ± tamamlanmasÄ± hedeflenir. |
| --- | --- |
| Installed on machine | app01 |
| listen on port | - |
| Work with these service(s) |  |
| global_config module_name | Utils |
| service name | utilsmanager.service |
| install path | /dengage/utilsmanager/ |
| setting file path | - |
| log config file path | /dengage_config/utilsmanager.nlog.config |
| file log path | /var/log/dengage/utilsmanager |
| has readmd file | yes |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.utilsmanager.git |
| integrated with appveyor | yes |
| idempotent | no |
| need internet access | no |
| accessible from outside | no |


| JmrpService |  |
| --- | --- |
| Description | Jmrp service is getting email record from special gmail inbox and process this mails for junk email reporting purposes. Bu header email client tarafÄ±ndan spam iÅŸaretlenen mail adresinden belirtilen gmail adresine bir email gÃ¶nderimi yapÄ±lmasÄ±nÄ± saÄŸlar, bu ÅŸekilde spam iÅŸaretleyen kullanÄ±cÄ±larÄ±n kim olduÄŸu ve spam raporlama iÅŸlemi yapÄ±lmÄ±ÅŸ olur. |


## Page 11

CDMP Service Descriptions
Jmrp servisi gÃ¶nderim sÄ±rasÄ±nda verilen bu gmail
adresine baÄŸlanarak inboxa dÃ¼ÅŸen mailleri iÅŸler ve bu
mailler iÃ§in common_log ÅŸemasÄ± altÄ±nda bulunan
email_event_log tablosuna bir kayÄ±t atarak ilgili gÃ¶nderim
raporlarÄ±nda Spam iÅŸaretleyen raporlarÄ±nÄ±n dÃ¼zgÃ¼n
Ã§alÄ±ÅŸmasÄ±nÄ± saÄŸlar
Installed on machine app01
listen on port -
Work with these service(s) -
global_config module_name JmrpProcessor
service name jmrpservice.service
install path /dengage/jmrpservice/
setting file path -
log config file path /dengage_config/jmrp.nlog.config
file log path /var/log/dengage/jmrpservice/
has readmd file yes
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.jmrpprocessor.git
integrated with appveyor no
idempotent no
need internet access yes
accessible from outside no
Push Sender Service
Description
PushSender service is responsible for sending prepared push message payload to related
services for example apns or firebase or webNative endpoints also prepare messages for
reporting and put this messages to rabbitmq again.
Push servisi aÃ§Ä±lÄ±rken sistemde aktif tÃ¼m accountlar iÃ§in aktif olan tÃ¼m push uygulama
tanÄ±mlarÄ±nÄ±n ilgili ayalarÄ±nÄ± alarak bu uygulamalar iÃ§in gÃ¶nderim yapmaya hazÄ±r hale gelir.
KullanÄ±cÄ±lar iÃ§in sistemde yapÄ±lacak olan uygulama deÄŸiÅŸikliklerini almak Ã¼zere uygulama
ayarlarÄ±nÄ± her 10 dakikada bir yeniden alarak varsa deÄŸiÅŸiklikleri uygulayarak gÃ¶nderim
Page 11

|  | Jmrp servisi gÃ¶nderim sÄ±rasÄ±nda verilen bu gmail adresine baÄŸlanarak inboxâ€™a dÃ¼ÅŸen mailleri iÅŸler ve bu mailler iÃ§in common_log ÅŸemasÄ± altÄ±nda bulunan email_event_log tablosuna bir kayÄ±t atarak ilgili gÃ¶nderim raporlarÄ±nda Spam iÅŸaretleyen raporlarÄ±nÄ±n dÃ¼zgÃ¼n Ã§alÄ±ÅŸmasÄ±nÄ± saÄŸlar |
| --- | --- |
| Installed on machine | app01 |
| listen on port | - |
| Work with these service(s) | - |
| global_config module_name | JmrpProcessor |
| service name | jmrpservice.service |
| install path | /dengage/jmrpservice/ |
| setting file path | - |
| log config file path | /dengage_config/jmrp.nlog.config |
| file log path | /var/log/dengage/jmrpservice/ |
| has readmd file | yes |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.jmrpprocessor.git |
| integrated with appveyor | no |
| idempotent | no |
| need internet access | yes |
| accessible from outside | no |


| Push Sender Service |
| --- |
| Description PushSender service is responsible for sending prepared push message payload to related services for example apns or firebase or webNative endpoints also prepare messages for reporting and put this messages to rabbitmq again. Push servisi aÃ§Ä±lÄ±rken sistemde aktif tÃ¼m accountlar iÃ§in aktif olan tÃ¼m push uygulama tanÄ±mlarÄ±nÄ±n ilgili ayalarÄ±nÄ± alarak bu uygulamalar iÃ§in gÃ¶nderim yapmaya hazÄ±r hale gelir. KullanÄ±cÄ±lar iÃ§in sistemde yapÄ±lacak olan uygulama deÄŸiÅŸikliklerini almak Ã¼zere uygulama ayarlarÄ±nÄ± her 10 dakikada bir yeniden alarak varsa deÄŸiÅŸiklikleri uygulayarak gÃ¶nderim |


## Page 12

CDMP Service Descriptions
iÅŸlemine devam eder.
Push gÃ¶nderimler iÃ§in Error ve Bounce eventlerini direk olarak verilen rabbitmq
queuesuna bÄ±rakÄ±r, Delivered olan gÃ¶nderimler iÃ§in account ve app bazÄ±nda gruplama
yaparak her 15 saniyede bir 15 saniye iÃ§inde gÃ¶nderilen push mesajlarÄ± iÃ§in rabbitmqya
bir rapor objesi bÄ±rakÄ±r.
Installed on machine Sender01,Sender02
listen on port -
Work with these service(s)
global_config module_name PushSender
service name pushsender
install path /dengage/pushsender
setting file path dengage_config/pushsender.settings.json
log config file path /dengage_config/pushsender.nlog.config
file log path /var/log/dengage/pushsender/
has readmd file no
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.pushsender.git
integrated with appveyor yes
idempotent yes
need internet access yes
accessible from outside no
Mobile Api Consumer a.k.a Subscription Service
Description Subscription: Information about device and contact by
using our mobile and web sdks.
Open signals: Information about if a user has opened
notification on device.
Each SDK sends a subscription request which includes
information about the device. Nginx web endpoint
receives a subscription payload then streams into a text
file on the server. Mobile Api Consumer service reads
each file with separate processes in parallel and
Page 12

| iÅŸlemine devam eder. Push gÃ¶nderimler iÃ§in Error ve Bounce eventlerini direk olarak verilen rabbitmq queueâ€™suna bÄ±rakÄ±r, Delivered olan gÃ¶nderimler iÃ§in account ve app bazÄ±nda gruplama yaparak her 15 saniyede bir 15 saniye iÃ§inde gÃ¶nderilen push mesajlarÄ± iÃ§in rabbitmqâ€™ya bir rapor objesi bÄ±rakÄ±r. |  |
| --- | --- |
| Installed on machine | Sender01,Sender02 |
| listen on port | - |
| Work with these service(s) |  |
| global_config module_name | PushSender |
| service name | pushsender |
| install path | /dengage/pushsender |
| setting file path | dengage_config/pushsender.settings.json |
| log config file path | /dengage_config/pushsender.nlog.config |
| file log path | /var/log/dengage/pushsender/ |
| has readmd file | no |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.pushsender.git |
| integrated with appveyor | yes |
| idempotent | yes |
| need internet access | yes |
| accessible from outside | no |


| Mobile Api Consumer a.k.a Subscription Service |  |
| --- | --- |
| Description | Subscription: Information about device and contact by using our mobile and web sdkâ€™s. Open signals: Information about if a user has opened notification on device. Each SDK sends a subscription request which includes information about the device. Nginx web endpoint receives a subscription payload then streams into a text file on the server. Mobile Api Consumer service reads each file with separate processes in parallel and |


## Page 13

CDMP Service Descriptions
generates Bulk Insert sentences. After generating bulk
scripts, it inserts them into the database.
Flow:
Internet Nginx to A file MobileApiConsumer
database (bulk insert)
Installed on machine public apis (where nginx is)
listen on port none
Work with these service(s)
global_config module_name
service name mobileapiconsumer
install path docker
setting file path /dengage/config
log config file path /dengage/config
file log path /dengage/log/mobileapiconsumer
has readmd file yes
repository link
integrated with appveyor yes
idempotent
need internet access none
accessible from outside none
URL Shortener Service
Description Url Shortener is a service which produces short urls for
sms links.
Installed on machine senders and public apis
listen on port
Work with these service(s) docker
global_config module_name
service name urlshortenerapi
Page 13

|  | generates Bulk Insert sentences. After generating bulk scripts, it inserts them into the database. Flow: Internet â†’ Nginx â†’ to A file â† MobileApiConsumer â†’ database (bulk insert) |
| --- | --- |
| Installed on machine | public apis (where nginx is) |
| listen on port | none |
| Work with these service(s) |  |
| global_config module_name |  |
| service name | mobileapiconsumer |
| install path | docker |
| setting file path | /dengage/config |
| log config file path | /dengage/config |
| file log path | /dengage/log/mobileapiconsumer |
| has readmd file | yes |
| repository link |  |
| integrated with appveyor | yes |
| idempotent |  |
| need internet access | none |
| accessible from outside | none |


| URL Shortener Service |  |
| --- | --- |
| Description | Url Shortener is a service which produces short urls for sms links. |
| Installed on machine | senders and public apis |
| listen on port |  |
| Work with these service(s) | docker |
| global_config module_name |  |
| service name | urlshortenerapi |


## Page 14

CDMP Service Descriptions
install path docker
setting file path /dengage/config
log config file path /dengage/config
file log path /dengage/log/urlshortener
has readmd file
repository link
integrated with appveyor yes
idempotent
need internet access yes
accessible from outside yes
AdminPanel Service
Description AdminPanel,RestApi and Public Signal Apis are on same
solution named den-saas-core.
AdminPanel service meets the requests from the panel
users
RestApi service meets the requests from the rest api
endpoints
PublicSignal service meets the requests from the end
users like email link click, email open, unsubscribe or
sms link click etc.
Installed on machine panel1-2, rest1-2,public1-2
listen on port change on config.xml file. panel default 80, rest default
8080 public default 8090
Work with these service(s) docker
global_config module_name
service name dsback
install path docker
setting file path /dengage/config
log config file path /dengage/config
file log path /dengage/log/dsback
Page 14

| install path | docker |
| --- | --- |
| setting file path | /dengage/config |
| log config file path | /dengage/config |
| file log path | /dengage/log/urlshortener |
| has readmd file |  |
| repository link |  |
| integrated with appveyor | yes |
| idempotent |  |
| need internet access | yes |
| accessible from outside | yes |


| AdminPanel Service |  |
| --- | --- |
| Description | AdminPanel,RestApi and Public Signal Apiâ€™s are on same solution named den-saas-core. AdminPanel service meets the requests from the panel users RestApi service meets the requests from the rest api endpoints PublicSignal service meets the requests from the end users like email link click, email open, unsubscribe or sms link click etc. |
| Installed on machine | panel1-2, rest1-2,public1-2 |
| listen on port | change on config.xml file. panel default 80, rest default 8080 public default 8090 |
| Work with these service(s) | docker |
| global_config module_name |  |
| service name | dsback |
| install path | docker |
| setting file path | /dengage/config |
| log config file path | /dengage/config |
| file log path | /dengage/log/dsback |


## Page 15

CDMP Service Descriptions
has readmd file yes
repository link http://bucket.whitehorse.technology:7990/scm/bs/panel-b
ack-end.git
integrated with appveyor yes
idempotent yes
need internet access yes
accessible from outside yes
IYS Service
Description IYS service is about to end user permisson sync to
Turkish goverment
This service syncronize end user permission from
dEngage to government and goverment to dEngage on
behalf of the most of Turkish customers of dEngage
Installed on machine app01
listen on port
Work with these service(s) docker
global_config module_name
service name iyssynchronizer
install path docker
setting file path /dengage/config
log config file path /dengage/config
file log path /dengage/log/iyssynchronizer
has readmd file no
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.iyssynchronizer.git
integrated with appveyor yes
idempotent yes
need internet access yes
accessible from outside no
Page 15

| has readmd file | yes |
| --- | --- |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/panel-b ack-end.git |
| integrated with appveyor | yes |
| idempotent | yes |
| need internet access | yes |
| accessible from outside | yes |


| IYS Service |  |
| --- | --- |
| Description | IYS service is about to end user permisson sync to Turkish goverment This service syncronize end user permission from dEngage to government and goverment to dEngage on behalf of the most of Turkish customers of dEngage |
| Installed on machine | app01 |
| listen on port |  |
| Work with these service(s) | docker |
| global_config module_name |  |
| service name | iyssynchronizer |
| install path | docker |
| setting file path | /dengage/config |
| log config file path | /dengage/config |
| file log path | /dengage/log/iyssynchronizer |
| has readmd file | no |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.iyssynchronizer.git |
| integrated with appveyor | yes |
| idempotent | yes |
| need internet access | yes |
| accessible from outside | no |


## Page 16

CDMP Service Descriptions
Export Manager Service
Description Export manager service is prepare export order based on
a sys.data_export_order table prepare data and export
data to Ftp, File download link, Google or Facebook
Installed on machine app01
listen on port
Work with these service(s) docker
global_config module_name
service name exportmanager
install path docker
setting file path /dengage/config
log config file path /dengage/config
file log path /dengage/log/exportmanager
has readmd file no
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.exportmanager.git
integrated with appveyor yes
idempotent no
need internet access yes
accessible from outside no
Node Utils Service
Description NodeUtils service is writing with nodeJS
This service doing this job
Making javascipt code syntax check
Making postresql syntax check
Creating safari push packages
Installed on machine app01
listen on port
Page 16

| Export Manager Service |  |
| --- | --- |
| Description | Export manager service is prepare export order based on a sys.data_export_order table prepare data and export data to Ftp, File download link, Google or Facebook |
| Installed on machine | app01 |
| listen on port |  |
| Work with these service(s) | docker |
| global_config module_name |  |
| service name | exportmanager |
| install path | docker |
| setting file path | /dengage/config |
| log config file path | /dengage/config |
| file log path | /dengage/log/exportmanager |
| has readmd file | no |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.exportmanager.git |
| integrated with appveyor | yes |
| idempotent | no |
| need internet access | yes |
| accessible from outside | no |


| Node Utils Service |  |
| --- | --- |
| Description | NodeUtils service is writing with nodeJS This service doing this job Making javascipt code syntax check Making postresql syntax check Creating safari push packages |
| Installed on machine | app01 |
| listen on port |  |


## Page 17

CDMP Service Descriptions
Work with these service(s) docker
global_config module_name
service name nodeutils.service
install path docker
setting file path /dengage/config
log config file path /dengage/config
file log path /dengage/log/nodeutils.service
has readmd file no
repository link http://bucket.whitehorse.technology:7990/scm/com/deng
age.nodeutils.git
integrated with appveyor no
idempotent no
need internet access yes
accessible from outside no
Event Processor Service
Description EventProcessor service is responsible for processing
incoming events from our sdks or custom
implemantation also processing some events like push
opens or inapp clicks etc.
Installed on machine public01,02,03
listen on port
Work with these service(s) docker
global_config module_name
service name eventprocessor
install path docker
setting file path /dengage/config
log config file path /dengage/config
file log path /dengage/log/eventprocessor
has readmd file yes
Page 17

| Work with these service(s) | docker |
| --- | --- |
| global_config module_name |  |
| service name | nodeutils.service |
| install path | docker |
| setting file path | /dengage/config |
| log config file path | /dengage/config |
| file log path | /dengage/log/nodeutils.service |
| has readmd file | no |
| repository link | http://bucket.whitehorse.technology:7990/scm/com/deng age.nodeutils.git |
| integrated with appveyor | no |
| idempotent | no |
| need internet access | yes |
| accessible from outside | no |


| Event Processor Service |  |
| --- | --- |
| Description | EventProcessor service is responsible for processing incoming events from our sdkâ€™s or custom implemantation also processing some events like push opens or inapp clicks etc. |
| Installed on machine | public01,02,03 |
| listen on port |  |
| Work with these service(s) | docker |
| global_config module_name |  |
| service name | eventprocessor |
| install path | docker |
| setting file path | /dengage/config |
| log config file path | /dengage/config |
| file log path | /dengage/log/eventprocessor |
| has readmd file | yes |


## Page 18

CDMP Service Descriptions
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.eventprocessor.git
integrated with appveyor no
idempotent no
need internet access yes
accessible from outside no
Filewatcher Service
Description Filedrop service is listen out ftp directory and if there is
any new file in there than prepare this file and put this file
to database and trigger automation service for
processing this file and process automation instance.
BulduÄŸu dosyalar iÃ§in bir worker thread aÃ§ar.
Bu thread dosyanÄ±n ftpye yÃ¼klenme iÅŸleminin bittiÄŸinden
emin olduktan sonra dosyanÄ±n alÄ±ndÄ±ÄŸÄ± dizinden account
ve user bilgisini alÄ±r ve bu bilgiler ile sistemde kayÄ±tlÄ± bir
automated job olup olmadÄ±ÄŸÄ±nÄ± kontrol eder, eÄŸer uygun
olan bir job yoksa hata verip dosyayÄ± siler.
Sistemde kayÄ±tlÄ± job bulunduktan sonra
sys_data_uplaod_file tablosuna alÄ±nan dosyayÄ± byte[]
olarak yazar ve ilgili automated jobda instance create
ederek iÅŸlemi sonlanrÄ±r, baÅŸarÄ±lÄ± olarak iÅŸlenen dosya
daha sonra ilgili klasÃ¶rden silinir.
Installed on machine ftp
listen on port
Work with these service(s) docker
global_config module_name
service name filewatcher
install path docker
setting file path /dengage/config
log config file path /dengage/config
file log path /dengage/log/filewatcher
has readmd file no
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
Page 18

| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.eventprocessor.git |
| --- | --- |
| integrated with appveyor | no |
| idempotent | no |
| need internet access | yes |
| accessible from outside | no |


| Filewatcher Service |  |
| --- | --- |
| Description | Filedrop service is listen out ftp directory and if there is any new file in there than prepare this file and put this file to database and trigger automation service for processing this file and process automation instance. BulduÄŸu dosyalar iÃ§in bir worker thread aÃ§ar. Bu thread dosyanÄ±n ftpâ€™ye yÃ¼klenme iÅŸleminin bittiÄŸinden emin olduktan sonra dosyanÄ±n alÄ±ndÄ±ÄŸÄ± dizinden account ve user bilgisini alÄ±r ve bu bilgiler ile sistemde kayÄ±tlÄ± bir automated job olup olmadÄ±ÄŸÄ±nÄ± kontrol eder, eÄŸer uygun olan bir job yoksa hata verip dosyayÄ± siler. Sistemde kayÄ±tlÄ± job bulunduktan sonra sys_data_uplaod_file tablosuna alÄ±nan dosyayÄ± byte[] olarak yazar ve ilgili automated jobâ€™da instance create ederek iÅŸlemi sonlanrÄ±r, baÅŸarÄ±lÄ± olarak iÅŸlenen dosya daha sonra ilgili klasÃ¶rden silinir. |
| Installed on machine | ftp |
| listen on port |  |
| Work with these service(s) | docker |
| global_config module_name |  |
| service name | filewatcher |
| install path | docker |
| setting file path | /dengage/config |
| log config file path | /dengage/config |
| file log path | /dengage/log/filewatcher |
| has readmd file | no |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag |


## Page 19

CDMP Service Descriptions
e.filewatcher.git
integrated with appveyor no
idempotent no
need internet access yes
accessible from outside no
Job Schedular Service
Description
JobSchedular service contains some job for daily reporting or process subscription etc.
Karix Reporting
Karix sms providerdan ilgili mÃ¼ÅŸterilerin sms gÃ¶nderim raporlarÄ±nÄ± Ã§eker.
Codec Reporting
Codec sms provider kullanan mÃ¼ÅŸteriler iÃ§in sms unsubscriber raporu Ã§eker
Subscription
Mobile apiler iÃ§in gelen subscriptionlarÄ± dbye insert etmek iÃ§in gerekli db functionÄ±
periyodik olarak Ã§aÄŸÄ±rÄ±r
Campaign Analytics
Campaign analytics modÃ¼lÃ¼nÃ¼n dÃ¼zgÃ¼n Ã§alÄ±ÅŸmasÄ± iÃ§in gereken bazÄ± sql scriptleri belirli
periyotlarda Ã§alÄ±ÅŸtÄ±rÄ±r.
Uninstall Tracking
Uninstall tracking enable olan bir her push app iÃ§in her gece bir silent push gÃ¶nderimi
kurar, Bu gÃ¶nderim sonrasÄ± oluÅŸan raporlar ile uygulamalarÄ± telefonlarÄ±ndan silmiÅŸ olan
mÃ¼ÅŸterilerin mobile tokenlarÄ±nÄ±n pasife Ã§ekilmesi hedeflenir.
Installed on machine app01
listen on port 5003
Work with these service(s) docker
global_config module_name
service name jobschedular
install path docker
setting file path /dengage/config
log config file path /dengage/config
file log path /dengage/log/jobschedular
has readmd file no
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.schedular.api.git
Page 19

|  | e.filewatcher.git |
| --- | --- |
| integrated with appveyor | no |
| idempotent | no |
| need internet access | yes |
| accessible from outside | no |


| Job Schedular Service |  |
| --- | --- |
| Description JobSchedular service contains some job for daily reporting or process subscription etc. Karix Reporting Karix sms providerâ€™dan ilgili mÃ¼ÅŸterilerin sms gÃ¶nderim raporlarÄ±nÄ± Ã§eker. Codec Reporting Codec sms provider kullanan mÃ¼ÅŸteriler iÃ§in sms unsubscriber raporu Ã§eker Subscription Mobile apiâ€™ler iÃ§in gelen subscriptionlarÄ± dbâ€™ye insert etmek iÃ§in gerekli db functionâ€™Ä± periyodik olarak Ã§aÄŸÄ±rÄ±r Campaign Analytics Campaign analytics modÃ¼lÃ¼nÃ¼n dÃ¼zgÃ¼n Ã§alÄ±ÅŸmasÄ± iÃ§in gereken bazÄ± sql scriptleri belirli periyotlarda Ã§alÄ±ÅŸtÄ±rÄ±r. Uninstall Tracking Uninstall tracking enable olan bir her push app iÃ§in her gece bir silent push gÃ¶nderimi kurar, Bu gÃ¶nderim sonrasÄ± oluÅŸan raporlar ile uygulamalarÄ± telefonlarÄ±ndan silmiÅŸ olan mÃ¼ÅŸterilerin mobile tokenâ€™larÄ±nÄ±n pasifâ€™e Ã§ekilmesi hedeflenir. |  |
| Installed on machine | app01 |
| listen on port | 5003 |
| Work with these service(s) | docker |
| global_config module_name |  |
| service name | jobschedular |
| install path | docker |
| setting file path | /dengage/config |
| log config file path | /dengage/config |
| file log path | /dengage/log/jobschedular |
| has readmd file | no |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.schedular.api.git |


## Page 20

CDMP Service Descriptions
integrated with appveyor no
idempotent no
need internet access yes
accessible from outside no
AppInboxFeeder Service
Description
If the "save to inbox" option is selected in the created campaign, the bulkcustomizer
service writes the required data for each send, that will appear on appinbox, to a directory
as a json file.
AppInboxFeeder service listens the directory written by bulkcustomizer. When the files in
this directory are equal or more than 1000 or 5 seconds have passed over the last
processed files(this information is come from the config file), AppInboxFeeder service gets
all json files in the directory. The service rotates by adding "proccessing" prefix at the
beginning of all received files. Then starts a thread for each account after grouping them
by account. Each thread writes the records to pi table under the account schema for the
related account.
Installed on machine Sender01,Sender02
listen on port -
Work with these service(s) BulkCustomizer
global_config module_name
service name appinboxfeeder
install path docker
setting file path /dengage/config/appinboxfeeder.appsettings.json
log config file path /dengage/config/appinboxfeeder.nlog.config
file log path /dengage/log/appinboxfeeder/
has readmd file no
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.appinboxfeeder.git
integrated with appveyor yes
idempotent yes
need internet access no
Page 20

| integrated with appveyor | no |
| --- | --- |
| idempotent | no |
| need internet access | yes |
| accessible from outside | no |


| AppInboxFeeder Service |  |
| --- | --- |
| Description If the "save to inbox" option is selected in the created campaign, the bulkcustomizer service writes the required data for each send, that will appear on appinbox, to a directory as a json file. AppInboxFeeder service listens the directory written by bulkcustomizer. When the files in this directory are equal or more than 1000 or 5 seconds have passed over the last processed files(this information is come from the config file), AppInboxFeeder service gets all json files in the directory. The service rotates by adding "proccessing" prefix at the beginning of all received files. Then starts a thread for each account after grouping them by account. Each thread writes the records to pi table under the account schema for the related account. |  |
| Installed on machine | Sender01,Sender02 |
| listen on port | - |
| Work with these service(s) | BulkCustomizer |
| global_config module_name |  |
| service name | appinboxfeeder |
| install path | docker |
| setting file path | /dengage/config/appinboxfeeder.appsettings.json |
| log config file path | /dengage/config/appinboxfeeder.nlog.config |
| file log path | /dengage/log/appinboxfeeder/ |
| has readmd file | no |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.appinboxfeeder.git |
| integrated with appveyor | yes |
| idempotent | yes |
| need internet access | no |


## Page 21

CDMP Service Descriptions
accessible from outside no
TagManager Service
Description
Tag Manager service is used to make push send with tags which is created over
"sendByTag" endpoint. The service selects the target audience for sending.Then inserts
the push messages to rabbitmq queue.
TagManager selects the sending from push_tag_send_order table under the sys schema.
If error occured in a sending, the service tries to send the messages 3 times again. After
the attemptions if error is still received, the service sets the sending status to
FINAL_ERROR.
TagManager is set the sending status to RELAYED after inserting messages to rabbitmq.
After that pushsender service gets the messages from rabbitmq and starts to send the
messages to devices.
Installed on machine app01
listen on port -
Work with these service(s)
global_config module_name tm
service name tagmanager
install path /dengage/tagmanager
setting file path no
log config file path /dengage_config/tagmanager.nlog.config
file log path /dengage/log/tagmanager/
has readmd file no
repository link http://bucket.whitehorse.technology:7990/scm/bs/dengag
e.tagmanager.git
integrated with appveyor yes
idempotent no
need internet access no
accessible from outside no
Page 21

| TagManager Service |  |
| --- | --- |
| Description Tag Manager service is used to make push send with tags which is created over "sendByTag" endpoint. The service selects the target audience for sending.Then inserts the push messages to rabbitmq queue. TagManager selects the sending from push_tag_send_order table under the sys schema. If error occured in a sending, the service tries to send the messages 3 times again. After the attemptions if error is still received, the service sets the sending status to FINAL_ERROR. TagManager is set the sending status to RELAYED after inserting messages to rabbitmq. After that pushsender service gets the messages from rabbitmq and starts to send the messages to devices. |  |
| Installed on machine | app01 |
| listen on port | - |
| Work with these service(s) |  |
| global_config module_name | tm |
| service name | tagmanager |
| install path | /dengage/tagmanager |
| setting file path | no |
| log config file path | /dengage_config/tagmanager.nlog.config |
| file log path | /dengage/log/tagmanager/ |
| has readmd file | no |
| repository link | http://bucket.whitehorse.technology:7990/scm/bs/dengag e.tagmanager.git |
| integrated with appveyor | yes |
| idempotent | no |
| need internet access | no |
| accessible from outside | no |


---
*Extraction method: pdfplumber*

---

## DevOps Evaluation Form

# DevOps Degerlendirme Formu

*Source: DevOps_Degerlendirme_Formu.xlsx*


## DevOps

*15 rows Ã— 3 columns*

| DevOps DeÄŸerlendirme Soru Seti | Unnamed: 1 | Unnamed: 2 |
| --- | --- | --- |
| No |  | DÂ·engage platformu Ã¼Ã§ farklÄ± deployment modelini destekler:<br><br>â€¢ Cloud (SaaS): DÂ·engage Cloud Ã¼zerinde tam yÃ¶netimli hizmet<br>â€¢ On-Premise: MÃ¼ÅŸteri veri merkezinde kurulum<br>â€¢ Hibrit/Private Cloud: AWS, Azure, Google Cloud, VMWare platformlarÄ±nda kurulum<br><br>Desteklenen platformlar: AWS, Azure, GCP, VMWare cloud platformlarÄ± desteklenmektedir. RHEL tabanlÄ± Linux daÄŸÄ±tÄ±mlarÄ± (CentOS, Rocky Linux) Ã¼zerinde Ã§alÄ±ÅŸÄ±r. |
| 1 | ÃœrÃ¼nÃ¼n cloud, on-premise veya hibrit ortamlarda Ã§alÄ±ÅŸabilirliÄŸi nedir? DesteklediÄŸi platformlar nelerdir? | Evet, DÂ·engage tam konteyner desteÄŸi sunar:<br><br>â€¢ Container Teknolojisi: Docker tercih edilen container teknolojisidir<br>â€¢ Orchestration: Kubernetes ve OpenShift container yÃ¶netim sistemleri desteklenmektedir<br>â€¢ Deployment SÃ¼reci: Docker container'larÄ± deploy edilir, DB paketleri ve scriptleri kurulur<br>â€¢ Micro-service Mimarisi: Platform micro-servis mimarisi Ã¼zerine kurulmuÅŸtur, 3. parti lisans baÄŸÄ±mlÄ±lÄ±ÄŸÄ± yoktur<br><br>Referans: Burgan Bank projesi - TÃ¼m platform bileÅŸenleri Kubernetes Ã¼zerinde Ã§alÄ±ÅŸtÄ±rÄ±lmaktadÄ±r. |
| 2 | UygulamanÄ±n konteyner desteÄŸi var mÄ±? Deployment sÃ¼reÃ§leri nasÄ±l yÃ¶netiliyor? | CI/CD entegrasyonu iÃ§in:<br><br>â€¢ SÃ¼rÃ¼m YÃ¶netimi: CD/CI sÃ¼reÃ§leri Ã¼zerinden sÃ¼rÃ¼m yÃ¶netimi gerÃ§ekleÅŸtirilmektedir<br>â€¢ DeÄŸiÅŸiklik YÃ¶netimi: Ä°lgili politika ve prosedÃ¼rler ile tanÄ±mlÄ±dÄ±r<br>â€¢ SDLC: Bilgi gÃ¼venliÄŸi, yazÄ±lÄ±m geliÅŸtirme yaÅŸam dÃ¶ngÃ¼sÃ¼ iÃ§erisinde tasarlanÄ±p uygulanmaktadÄ±r<br>â€¢ GÃ¼ncelleme: Docker container gÃ¼ncellemeleri ile versiyon yÃ¶netimi yapÄ±lmaktadÄ±r<br><br>Standart CI/CD araÃ§larÄ± ile entegrasyon desteklenmektedir. |
| 3 | CI/CD entegrasyonu iÃ§in hangi araÃ§larÄ± ve yÃ¶ntemleri destekliyorsunuz?  | Otomatik Ã¶lÃ§eklenebilirlik ve yÃ¼k dengeleme:<br><br>â€¢ HA YapÄ±sÄ±: TÃ¼m servisler minimum 2 sunucu Ã¼zerinde HA (High Availability) ve load balancing ÅŸeklinde Ã§alÄ±ÅŸmaktadÄ±r<br>â€¢ VeritabanÄ±: Master + n replica ile HA ve yÃ¼k daÄŸÄ±lÄ±mÄ± saÄŸlanmaktadÄ±r<br>â€¢ Paralel YÃ¼rÃ¼tÃ¼m: Desteklenmektedir<br>â€¢ Clustering: Paralel Ã§alÄ±ÅŸma Ã¶zelliÄŸine engel durum yoktur<br>â€¢ Performans: Saatte 1.000.000 mesaj gÃ¶nderim kapasitesi desteklenir<br><br>Kaynak artÄ±rÄ±mÄ± ile Ã¶lÃ§ekleme talebi karÅŸÄ±lanabilmektedir. |
| 4 | UygulamanÄ±n otomatik Ã¶lÃ§eklenebilirlik ve yÃ¼k dengeleme Ã¶zellikleri var mÄ±? | Loglama, izleme ve alarm mekanizmalarÄ±:<br><br>â€¢ Log YÃ¶netimi: Graylog entegrasyonu mevcut, loglar tek tÄ±klama ile istenilen veritabanÄ±na yazÄ±labilir<br>â€¢ Sunucu MonitÃ¶rleme: Zabbix, Graylog ve diÄŸer monitoring ajanlarÄ± kurulabilir<br>â€¢ Ä°zleme Ã–zellikleri:<br>  - Servis port izleme<br>  - Ã–zel healthcheck URL'leri<br>  - DB ve RabbitMQ taraflÄ± monitoring servisleri<br>â€¢ SIEM: 2 farklÄ± SIEM Ã¼zerinden monitor edilmektedir<br>â€¢ Alert TanÄ±mlarÄ±: Graylog'daki tÃ¼m yetenekler kullanÄ±labilir<br><br>APM (Application Performance Monitoring) entegrasyonu mevcuttur. |
| 5 | Loglama, izleme ve alarm mekanizmalarÄ± nasÄ±l saÄŸlanÄ±yor? Hangi araÃ§larla entegre edilebilir? | Yedekleme ve veri bÃ¼tÃ¼nlÃ¼ÄŸÃ¼ Ã§Ã¶zÃ¼mleri:<br><br>â€¢ VeritabanÄ± Yedekleme: GÃ¼nlÃ¼k incremental veritabanÄ± yedekleri alÄ±nmaktadÄ±r<br>â€¢ Yedek Sunucusu: AyrÄ± bir yedek sunucusu bulunmaktadÄ±r (DB topoloji dokÃ¼manÄ±nda detaylandÄ±rÄ±lmÄ±ÅŸtÄ±r)<br>â€¢ Disaster Recovery: Disaster site yapÄ±sÄ± mevcuttur<br>â€¢ Yedekleme KapsamÄ±:<br>  - Ã‡Ã¶zÃ¼m tarafÄ±ndan tutulan tÃ¼m veriler<br>  - TÃ¼m konfigÃ¼rasyon dosyalarÄ±<br>  - TÃ¼m metadata<br>â€¢ Cloud Storage: Backup retention ve global replication politikalarÄ± ile yedekleme<br><br>Veri bÃ¼tÃ¼nlÃ¼ÄŸÃ¼ ve sÃ¼rekliliÄŸi iÃ§in ISO 22301 sertifikasyonuna sahibiz. |
| 6 | Yedekleme ve veri bÃ¼tÃ¼nlÃ¼ÄŸÃ¼ iÃ§in ne tÃ¼r Ã§Ã¶zÃ¼mler sunuluyor? | GÃ¼ncelleme ve versiyon yÃ¶netimi:<br><br>â€¢ GÃ¼ncelleme YaklaÅŸÄ±mÄ±: Docker container gÃ¼ncellemeleri<br>â€¢ Yama YÃ¶netimi: DÃ¼zenli olarak 3 aylÄ±k periyotlarla gÃ¼venlik yamalarÄ± uygulanmaktadÄ±r<br>â€¢ Zafiyet TaramasÄ±: DÃ¼zenli aylÄ±k Nessus taramalarÄ± yapÄ±lmaktadÄ±r<br>â€¢ SÃ¼rÃ¼m YÃ¶netimi: CD/CI sÃ¼reÃ§leri Ã¼zerinden gerÃ§ekleÅŸtirilmektedir<br>â€¢ SaaS GÃ¼ncellemeleri: Cloud major update paketleri on-premise paketlerden 3 ay Ã¶nce deploy edilmektedir<br><br>Rollback DesteÄŸi: Recovery stratejisi mevcuttur. TÃ¼m servisler HA yapÄ±sÄ±nda Ã§alÄ±ÅŸtÄ±ÄŸÄ± iÃ§in kesintisiz gÃ¼ncelleme yapÄ±labilir. |
| 7 | GÃ¼ncelleme ve versiyon yÃ¶netimi sÃ¼reÃ§leri nasÄ±l iÅŸliyor? Rollback desteÄŸi var mÄ±? | GÃ¼venlik Ã¶zellikleri:<br><br>â€¢ Kimlik DoÄŸrulama:<br>  - LDAP/Active Directory entegrasyonu mevcuttur<br>  - MFA (Multi-Factor Authentication) dahildir<br>â€¢ Yetkilendirme:<br>  - Rol-yetki matrisleri oluÅŸturulmuÅŸtur<br>  - Minimum yetki prensibi uygulanmaktadÄ±r<br>â€¢ Åžifreleme:<br>  - Kriptografik anahtar yÃ¶netimi politikasÄ± mevcuttur<br>  - SSL/TLS ÅŸifreleme<br>  - VPN tÃ¼nel desteÄŸi, istenirse belirli IP'lere kÄ±sÄ±tlama<br>â€¢ Sertifikasyonlar: ISO 27001, ISO 22301 sertifikalÄ±<br>â€¢ GÃ¼venlik Testleri:<br>  - Statik uygulama taramasÄ± (yÄ±llÄ±k, 3. parti firma)<br>  - YazÄ±lÄ±m bileÅŸimi analizi (SCA)<br>  - SÄ±kÄ±laÅŸtÄ±rma (CIS tabanlÄ± hardening) |
| 8 | UygulamanÄ±n gÃ¼venlik (kimlik doÄŸrulama, yetkilendirme, ÅŸifreleme) Ã¶zellikleri nelerdir? | API ve entegrasyon kabiliyetleri:<br><br>â€¢ RESTful API: KapsamlÄ± API desteÄŸi mevcuttur<br>â€¢ SDK'lar: iOS, Android, Web SDK'larÄ± mevcuttur<br>â€¢ Veri Entegrasyonu:<br>  - ODBC/JDBC baÄŸlantÄ± desteÄŸi<br>  - Remote sourcing ile veri Ã§oÄŸaltma olmadan entegrasyon<br>  - ETL Automated Flow aracÄ±<br>â€¢ Kanal EntegrasyonlarÄ±:<br>  - Email, SMS, Push Notification<br>  - WhatsApp Business API<br>  - Web Push, In-App mesajlaÅŸma<br>â€¢ Webhook ve Real-time Event desteÄŸi<br>â€¢ Kafka entegrasyonu iÃ§in Ã¶zel geliÅŸtirme yapÄ±labilir<br><br>API dokÃ¼mantasyonu: https://dev.dengage.com/reference/general |
| 9 | API ve entegrasyon kabiliyetleri nelerdir? | Sistem gereksinimleri:<br><br>Database Server:<br>â€¢ OS: RHEL tabanlÄ± Linux daÄŸÄ±tÄ±mlarÄ±<br>â€¢ DB: PostgreSQL 12+<br>â€¢ RAM: 2x32GB + 3x4GB (toplam 5 sunucu)<br>â€¢ CPU: 2x16 CPU + 3x2 CPU (min 2.1 GHz)<br>â€¢ Disk: 3x200GB Data + 30GB OS (SSD, min 3000 IOPS)<br>â€¢ Network: 10Gig LAN, 100Mbit internet<br><br>Application Server:<br>â€¢ OS: RHEL tabanlÄ± Linux daÄŸÄ±tÄ±mlarÄ±<br>â€¢ Platform: .NET Core 3.1+<br>â€¢ BileÅŸenler: RabbitMQ, Redis, NFS, PureFTPs, Nginx<br>â€¢ RAM: 2x48GB<br>â€¢ CPU: 2x16 CPU (min 2.1 GHz)<br>â€¢ Disk: 2x200GB Data + 30GB OS (SSD, min 1500 IOPS)<br><br>Not: Bu konfigÃ¼rasyon saatte 1.000.000 mesaj gÃ¶nderimini destekler. |
| 10 | UygulamanÄ±n performans ve kaynak kullanÄ±mÄ± ile ilgili minimum ve Ã¶nerilen sistem gereksinimleri nelerdir? | SLA ve destek sÃ¼reÃ§leri:<br><br>â€¢ Destek KanallarÄ±:<br>  - Online mÃ¼ÅŸteri hizmetleri portalÄ± (support ticket sistemi)<br>  - Email desteÄŸi (7 gÃ¼n/hafta Ã§alÄ±ÅŸma saatlerinde)<br>  - Mesai dÄ±ÅŸÄ± destek<br>  - Hesap yÃ¶netimi<br>â€¢ SLA Seviyeleri: SÃ¶zleÅŸmede aÃ§Ä±kÃ§a belirtilmektedir<br>â€¢ Ã‡Ã¶zÃ¼m SÃ¼releri: Problem sÄ±nÄ±flandÄ±rma ve Ã¶nceliklendirme ile tanÄ±mlÄ±<br>â€¢ Uptime Garantisi: %99.999 availability (5 global datacenter)<br>â€¢ EÄŸitim: Son kullanÄ±cÄ± eÄŸitimleri dahildir<br>â€¢ ÃœrÃ¼n GÃ¼ncellemeleri: DÃ¼zenli gÃ¼ncelleme paketleri<br><br>DetaylÄ± SLA koÅŸullarÄ± sÃ¶zleÅŸme ekinde yer almaktadÄ±r. |
| 11 | SLA (Service Level Agreement) ve destek sÃ¼reÃ§leriniz nasÄ±l tanÄ±mlanÄ±yor? | DokÃ¼mantasyon ve rehberler:<br><br>â€¢ Teknik DokÃ¼mantasyon:<br>  - API DokÃ¼mantasyonu: https://dev.dengage.com/reference/general<br>  - BaÅŸlangÄ±Ã§ Rehberi: https://dev.dengage.com/docs/getting-started<br>  - Changelog: https://dev.dengage.com/changelog<br>â€¢ Kurulum DokÃ¼mantasyonu:<br>  - Network topoloji dokÃ¼manÄ±<br>  - DB topoloji dokÃ¼manÄ±<br>  - Sistem gereksinimleri dokÃ¼manÄ±<br>â€¢ Operasyonel Rehberler:<br>  - Son kullanÄ±cÄ± eÄŸitim materyalleri<br>  - Teknik eÄŸitim dokÃ¼manlarÄ±<br>â€¢ Destek: Belirli aralÄ±klarla eÄŸitim verilmektedir<br><br>TÃ¼m dokÃ¼mantasyon sÃ¼rekli gÃ¼ncellenmektedir. |
| 12 | UygulamanÄ±n dokÃ¼mantasyonu, kurulum ve operasyonel yÃ¶netim rehberleri mevcut mu? | Test/Demo ortamÄ± gereksinimleri:<br><br>â€¢ Test OrtamÄ±:<br>  - Test ve production hesaplarÄ± ayrÄ± olarak kullanÄ±labilmektedir<br>  - GeliÅŸtirme, test ve prod ortamlarÄ± ayrÄ±lmÄ±ÅŸtÄ±r (DTAP)<br>  - Hassas bilgileri gerÃ§ek verilerden arÄ±ndÄ±rma sÃ¼reci uygulanabilir<br>â€¢ Sandbox/Demo:<br>  - SaaS platformunda demo hesabÄ± oluÅŸturulabilir<br>  - Tam Ã¶zellikli deneme ortamÄ± sunulmaktadÄ±r<br>â€¢ POC Gereksinimleri:<br>  - Minimum konfigÃ¼rasyon ile baÅŸlanabilir<br>  - Cloud Ã¼zerinde hÄ±zlÄ± kurulum mÃ¼mkÃ¼ndÃ¼r<br>  - On-premise iÃ§in VM/container ortamÄ± yeterlidir<br><br>POC sÃ¼reci iÃ§in teknik ekibimiz destek saÄŸlamaktadÄ±r. |
| 13 | ÃœrÃ¼nÃ¼n test ortamÄ±, sandbox veya demo kurulumu iÃ§in teknik gereksinimler nelerdir? | Lisanslama ve maliyet yapÄ±sÄ±:<br><br>â€¢ Lisans Modeli:<br>  - SaaS: AylÄ±k/yÄ±llÄ±k abonelik bazlÄ±<br>  - On-Premise: Perpetual veya subscription lisans seÃ§enekleri<br>â€¢ Maliyet FaktÃ¶rleri:<br>  - Aktif kullanÄ±cÄ± sayÄ±sÄ±<br>  - Mesaj hacmi<br>  - KullanÄ±lan modÃ¼ller/kanallar<br>  - Destek seviyesi<br>â€¢ 3. Parti Lisans: Platform 3. parti lisans baÄŸÄ±mlÄ±lÄ±ÄŸÄ± iÃ§ermemektedir |
| 14 | UygulamanÄ±n lisanslama modeli ve maliyetlendirme yapÄ±sÄ± nedir? | DetaylÄ± fiyatlandÄ±rma teklifi, ihtiyaÃ§ analizi sonrasÄ±nda sunulmaktadÄ±r. |

---

## Infrastructure Question Sets

# AltyapÄ± Soru Setleri

*Source: AltyapÄ± Soru Setleri.xlsx*


## Veri TabanÄ±

*13 rows Ã— 3 columns*

| DÄ±ÅŸ Firma UygulamalarÄ± Veri TabanÄ± DeÄŸerlendirme Soru Seti | Unnamed: 1 | Unnamed: 2 |
| --- | --- | --- |
| No |  | Cevap |
| 1 | Desteklenen veri tabanlarÄ± servisleri nelerdir? Hangi versiyonlarÄ± desteklenmektedir? | PostgreSQL 17+ desteklenmektedir. 18.X iÃ§in testler yapÄ±lÄ±yor, resmileÅŸecektir. Distributed PostgreSQL mimarisi kullanÄ±lmaktadÄ±r. <br>AyrÄ±ca Remote Source Ã¶zelliÄŸi ile aÅŸaÄŸÄ±daki veritabanlarÄ±na doÄŸrudan baÄŸlantÄ± saÄŸlanabilmektedir:<br>- Microsoft SQL Server / Azure DW<br>- MySQL<br>- PostgreSQL<br>- Oracle<br>- Google BigQuery<br>- SAP HANA<br>- Dremio<br>- Kafka |
| 2 | Veri tabanÄ± iÃ§in hangi collation gereklidir? | PostgreSQL veritabanÄ± iÃ§in UTF-8 collation kullanÄ±lmaktadÄ±r. <br>TÃ¼rkÃ§e dahil Ã§oklu dil desteÄŸi iÃ§in uygun karakter seti yapÄ±landÄ±rmasÄ± mevcuttur. |
| 3 | NT/LDAP authentication destekleniyor mu? | Dengage'in standart mimarisinde NT/LDAP kimlik doÄŸrulamasÄ± doÄŸrudan desteklenen bir yapÄ± deÄŸildir. Ancak, Kuveyt TÃ¼rk tarafÄ±ndaki kullanÄ±cÄ±larÄ±n sisteme eriÅŸimi sÄ±rasÄ±nda bu protokolÃ¼n kullanÄ±labilmesi iÃ§in gerekli konfigÃ¼rasyonlar (Gateway, Proxy veya SSO katmanlarÄ± Ã¼zerinden) Kuveyt TÃ¼rk tarafÄ±nda kurgulanabilmektedir.<br><br>Sistem yÃ¶netimi ve operasyonel sÃ¼reÃ§lerde ise; hem uygulama katmanÄ± hem de Dengage destek ekibi, veritabanÄ± iÅŸlemlerini doÄŸrudan postgres yetkili kullanÄ±cÄ±sÄ± Ã¼zerinden gerÃ§ekleÅŸtirmektedir. |
| 4 | ArÅŸivleme altyapÄ±sÄ± var mÄ±? | VeritabanÄ± her gÃ¼n veya iki gÃ¼nde bir otomatik olarak yedeklenmekte ve sistemde veri silinmeyip sÃ¼rekli korunmaktadÄ±r. Hacmi bÃ¼yÃ¼yen tablolarÄ±n arÅŸivlenmesi, mÃ¼ÅŸterinin isteÄŸine baÄŸlÄ± olarak loglarÄ±n farklÄ± bir ortama (remote target) taÅŸÄ±nmasÄ± yÃ¶ntemiyle gerÃ§ekleÅŸtirilebilir. |
| 5 | Veri sÃ¶zlÃ¼ÄŸÃ¼ var mÄ±? Var ise nerede tutuluyor? |  Open ve extensible data structure sunulmaktadÄ±r<br> Her mÃ¼ÅŸteri kendi data ÅŸemasÄ±nÄ± tasarlayabilir<br> Unlimited relational tables ve multi-source data connection desteÄŸi vardÄ±r<br> Metadata yÃ¶netimi platform iÃ§erisinde yapÄ±lmaktadÄ±r |
| 6 | DB katmanÄ±nda business logic var mÄ±?  | Evet |
| 7 | Stored Procedure/package tarzÄ± yapÄ±lar var mÄ±? Yoksa ad-hoc query/ORM gibi yapÄ±lar mÄ± kullanÄ±lÄ±yor? | Stored Procedure ve fonksiyonlar DB'de bulunuyor. Ad-hoc query'ler iÃ§in Ã¶zel bir yapÄ± yoktur. |
| 8 | Ã–nerilen ve desteklenen high availability cozumu ve cozumleri nelerdir? | Hem veritabanÄ± (DB) hem de uygulama (App) katmanlarÄ±nÄ±n Ã¶nÃ¼ne ikiÅŸer adet HA sunucusu konumlandÄ±rÄ±larak tam yedekli bir yapÄ± sunulmaktadÄ±r. Bir sunucunun devre dÄ±ÅŸÄ± kalmasÄ± durumunda, sistem Sanal IP (VIP) Ã¼zerinden diÄŸer sunucuya yÃ¶nlenerek kesintisiz hizmet vermeye devam eder. Uygulama Ã¼zerindeki tÃ¼m servisler de bu VIP yapÄ±sÄ±nÄ± kullandÄ±ÄŸÄ± iÃ§in uÃ§tan uca yÃ¼ksek eriÅŸilebilirlik saÄŸlanmÄ±ÅŸ olur. |
| 9 | Veri tabanÄ±nÄ±n koÅŸacaÄŸÄ± sunucu sanal olabilir mi? Yoksa fiziksel mÄ± olmalÄ±? | Fiziksel olma ÅŸartÄ± yoktur. |
| 10 | Ä°htiyaÃ§ duyulan minimum CPU ve Ram ne kadardÄ±r? | GÃ¶nderim hacmine baÄŸlÄ± deÄŸiÅŸiklik gÃ¶sterir. Database Server iÃ§in minimum gereksinimler:<br>- CPU: 2 x 16 Core (min 2.1 GHz) + 3 x 2 Core (HA/LB sunucularÄ± iÃ§in)<br>- RAM: 2 x 32GB (ana DB sunucularÄ±) + 3 x 4GB (yardÄ±mcÄ± sunucular)<br>- Toplam 5 sunucu: 2 active/active DB, 2 loadbalancer, 1 backup<br>- Network: 10Gig LAN, 100Mbit internet<br>- Disk: SSD grade (min 3000 IOPS), 550 MB/sec read/write |
| 11 | Ã–nÃ¼mÃ¼zdeki 3 sene iÃ§erisinde ulaÅŸÄ±lmasÄ± beklenen maksimum veri tabanÄ± boyutu nedir? | MÃ¼ÅŸteri tabanÄ± ve kullanÄ±m senaryosuna baÄŸlÄ± olarak deÄŸiÅŸmektedir.<br>Referans olarak:<br>- 1 milyon gÃ¼nlÃ¼k mesaj kapasitesi iÃ§in 300GB-500GB veri alanÄ±<br>- Kampanya response'larÄ± 1 yÄ±l, event datasÄ± 6 ay saklanmaktadÄ±r<br>- Remote Source Ã¶zelliÄŸi ile data duplication olmadan harici veritabanlarÄ±ndan veri Ã§ekilebilir<br>- Beklenen bÃ¼yÃ¼me oranÄ±na gÃ¶re Ã¶zel sizing yapÄ±labilmektedir |
| 12 | Ã–rnek iÅŸ yÃ¼kÃ¼ testi istatistikleri elinizde var mÄ±? Varsa paylaÅŸabilir misiniz? | Evet, iÅŸ yÃ¼kÃ¼ test istatistikleri mevcuttur:<br>- Platform 1,000,000 mesaj/saat gÃ¶nderim kapasitesine sahiptir<br>- Transactional API yanÄ±t sÃ¼resi: <50ms<br>- Burgan Bank: ~1 milyon gÃ¼nlÃ¼k SMS, push notification ve in-app mesaj<br>- Fibabanka: 4+ milyon mÃ¼ÅŸteri iÃ§in yÃ¼ksek hacimli iÅŸlem kapasitesi<br>- %99,998 uptime garantisi |

## Uygulama AltyapÄ±larÄ±

*15 rows Ã— 3 columns*

| DevOps DeÄŸerlendirme Soru Seti | Unnamed: 1 | Unnamed: 2 |
| --- | --- | --- |
| No |  | Cevap |
| 1 | ÃœrÃ¼nÃ¼n cloud, on-premise veya hibrit ortamlarda Ã§alÄ±ÅŸabilirliÄŸi nedir? DesteklediÄŸi platformlar nelerdir? | "DÂ·engage platformu Ã¼Ã§ farklÄ± deployment modelini destekler:<br><br>â€¢ Cloud (SaaS): DÂ·engage Cloud Ã¼zerinde tam yÃ¶netimli hizmet<br>â€¢ On-Premise: MÃ¼ÅŸteri veri merkezinde kurulum<br>â€¢ Hibrit/Private Cloud: AWS, Azure, Google Cloud, VMWare platformlarÄ±nda kurulum<br><br>Desteklenen platformlar: AWS, Azure, GCP, VMWare cloud platformlarÄ± desteklenmektedir. RHEL tabanlÄ± Linux daÄŸÄ±tÄ±mlarÄ± (CentOS, Rocky Linux) Ã¼zerinde Ã§alÄ±ÅŸÄ±r." |
| 2 | UygulamanÄ±n konteyner desteÄŸi var mÄ±? Deployment sÃ¼reÃ§leri nasÄ±l yÃ¶netiliyor? | Evet, DÂ·engage tam konteyner desteÄŸi sunar:<br><br>â€¢ Container Teknolojisi: Docker tercih edilen container teknolojisidir<br>â€¢ Orchestration: Kubernetes ve OpenShift container yÃ¶netim sistemleri desteklenmektedir<br>â€¢ Deployment SÃ¼reci: Docker container'larÄ± deploy edilir, DB paketleri ve scriptleri kurulur<br>â€¢ Micro-service Mimarisi: Platform micro-servis mimarisi Ã¼zerine kurulmuÅŸtur, 3. parti lisans baÄŸÄ±mlÄ±lÄ±ÄŸÄ± yoktur<br><br>Referans: Burgan Bank projesi - TÃ¼m platform bileÅŸenleri Kubernetes Ã¼zerinde Ã§alÄ±ÅŸtÄ±rÄ±lmaktadÄ±r. |
| 3 | CI/CD entegrasyonu iÃ§in hangi araÃ§larÄ± ve yÃ¶ntemleri destekliyorsunuz?  | CI/CD entegrasyonu iÃ§in:<br><br>â€¢ SÃ¼rÃ¼m YÃ¶netimi: CD/CI sÃ¼reÃ§leri Ã¼zerinden sÃ¼rÃ¼m yÃ¶netimi gerÃ§ekleÅŸtirilmektedir<br>â€¢ DeÄŸiÅŸiklik YÃ¶netimi: Ä°lgili politika ve prosedÃ¼rler ile tanÄ±mlÄ±dÄ±r<br>â€¢ SDLC: Bilgi gÃ¼venliÄŸi, yazÄ±lÄ±m geliÅŸtirme yaÅŸam dÃ¶ngÃ¼sÃ¼ iÃ§erisinde tasarlanÄ±p uygulanmaktadÄ±r<br>â€¢ GÃ¼ncelleme: Docker container gÃ¼ncellemeleri ile versiyon yÃ¶netimi yapÄ±lmaktadÄ±r<br><br>Standart CI/CD araÃ§larÄ± ile entegrasyon desteklenmektedir. |
| 4 | UygulamanÄ±n otomatik Ã¶lÃ§eklenebilirlik ve yÃ¼k dengeleme Ã¶zellikleri var mÄ±? | Otomatik Ã¶lÃ§eklenebilirlik ve yÃ¼k dengeleme:<br><br>â€¢ HA YapÄ±sÄ±: TÃ¼m servisler minimum 2 sunucu Ã¼zerinde HA (High Availability) ve load balancing ÅŸeklinde Ã§alÄ±ÅŸmaktadÄ±r<br>â€¢ VeritabanÄ±: Master + n replica ile HA ve yÃ¼k daÄŸÄ±lÄ±mÄ± saÄŸlanmaktadÄ±r<br>â€¢ Paralel YÃ¼rÃ¼tÃ¼m: Desteklenmektedir<br>â€¢ Clustering: Paralel Ã§alÄ±ÅŸma Ã¶zelliÄŸine engel durum yoktur<br>â€¢ Performans: Saatte 1.000.000 mesaj gÃ¶nderim kapasitesi desteklenir<br><br>Kaynak artÄ±rÄ±mÄ± ile Ã¶lÃ§ekleme talebi karÅŸÄ±lanabilmektedir. |
| 5 | Loglama, izleme ve alarm mekanizmalarÄ± nasÄ±l saÄŸlanÄ±yor? Hangi araÃ§larla entegre edilebilir? | Loglama, izleme ve alarm mekanizmalarÄ±:<br><br>â€¢ Log YÃ¶netimi: Graylog entegrasyonu mevcut, loglar tek tÄ±klama ile istenilen veritabanÄ±na yazÄ±labilir<br>â€¢ Sunucu MonitÃ¶rleme: Zabbix, Graylog ve diÄŸer monitoring ajanlarÄ± kurulabilir<br>â€¢ Ä°zleme Ã–zellikleri:<br>  - Servis port izleme<br>  - Ã–zel healthcheck URL'leri<br>  - DB ve RabbitMQ taraflÄ± monitoring servisleri<br>â€¢ SIEM: 2 farklÄ± SIEM Ã¼zerinden monitor edilmektedir<br>â€¢ Alert TanÄ±mlarÄ±: Graylog'daki tÃ¼m yetenekler kullanÄ±labilir<br><br>APM (Application Performance Monitoring) entegrasyonu mevcuttur. |
| 6 | Yedekleme ve veri bÃ¼tÃ¼nlÃ¼ÄŸÃ¼ iÃ§in ne tÃ¼r Ã§Ã¶zÃ¼mler sunuluyor? | Yedekleme ve veri bÃ¼tÃ¼nlÃ¼ÄŸÃ¼ Ã§Ã¶zÃ¼mleri:<br><br>â€¢ VeritabanÄ± Yedekleme: GÃ¼nlÃ¼k incremental veritabanÄ± yedekleri alÄ±nmaktadÄ±r<br>â€¢ Yedek Sunucusu: AyrÄ± bir yedek sunucusu bulunmaktadÄ±r (DB topoloji dokÃ¼manÄ±nda detaylandÄ±rÄ±lmÄ±ÅŸtÄ±r)<br>â€¢ Disaster Recovery: Disaster site yapÄ±sÄ± mevcuttur<br>â€¢ Yedekleme KapsamÄ±:<br>  - Ã‡Ã¶zÃ¼m tarafÄ±ndan tutulan tÃ¼m veriler<br>  - TÃ¼m konfigÃ¼rasyon dosyalarÄ±<br>  - TÃ¼m metadata<br>â€¢ Cloud Storage: Backup retention ve global replication politikalarÄ± ile yedekleme<br><br>Veri bÃ¼tÃ¼nlÃ¼ÄŸÃ¼ ve sÃ¼rekliliÄŸi iÃ§in ISO 22301 sertifikasyonuna sahibiz. |
| 7 | GÃ¼ncelleme ve versiyon yÃ¶netimi sÃ¼reÃ§leri nasÄ±l iÅŸliyor? Rollback desteÄŸi var mÄ±? | GÃ¼ncelleme ve versiyon yÃ¶netimi:<br><br>â€¢ GÃ¼ncelleme YaklaÅŸÄ±mÄ±: Docker container gÃ¼ncellemeleri<br>â€¢ Yama YÃ¶netimi: DÃ¼zenli olarak 3 aylÄ±k periyotlarla gÃ¼venlik yamalarÄ± uygulanmaktadÄ±r<br>â€¢ Zafiyet TaramasÄ±: DÃ¼zenli aylÄ±k Nessus taramalarÄ± yapÄ±lmaktadÄ±r<br>â€¢ SÃ¼rÃ¼m YÃ¶netimi: CD/CI sÃ¼reÃ§leri Ã¼zerinden gerÃ§ekleÅŸtirilmektedir<br>â€¢ SaaS GÃ¼ncellemeleri: Cloud major update paketleri on-premise paketlerden 3 ay Ã¶nce deploy edilmektedir<br><br>Rollback DesteÄŸi: Recovery stratejisi mevcuttur. TÃ¼m servisler HA yapÄ±sÄ±nda Ã§alÄ±ÅŸtÄ±ÄŸÄ± iÃ§in kesintisiz gÃ¼ncelleme yapÄ±labilir. |
| 8 | UygulamanÄ±n gÃ¼venlik (kimlik doÄŸrulama, yetkilendirme, ÅŸifreleme) Ã¶zellikleri nelerdir? | GÃ¼venlik Ã¶zellikleri:<br><br>â€¢ Kimlik DoÄŸrulama:<br>  - LDAP/Active Directory entegrasyonu mevcuttur<br>  - MFA (Multi-Factor Authentication) dahildir<br>â€¢ Yetkilendirme:<br>  - Rol-yetki matrisleri oluÅŸturulmuÅŸtur<br>  - Minimum yetki prensibi uygulanmaktadÄ±r<br>â€¢ Åžifreleme:<br>  - Kriptografik anahtar yÃ¶netimi politikasÄ± mevcuttur<br>  - SSL/TLS ÅŸifreleme<br>  - VPN tÃ¼nel desteÄŸi, istenirse belirli IP'lere kÄ±sÄ±tlama<br>â€¢ Sertifikasyonlar: ISO 27001, ISO 22301 sertifikalÄ±<br>â€¢ GÃ¼venlik Testleri:<br>  - Statik uygulama taramasÄ± (yÄ±llÄ±k, 3. parti firma)<br>  - YazÄ±lÄ±m bileÅŸimi analizi (SCA)<br>  - SÄ±kÄ±laÅŸtÄ±rma (CIS tabanlÄ± hardening) |
| 9 | API ve entegrasyon kabiliyetleri nelerdir? | API ve entegrasyon kabiliyetleri:<br><br>â€¢ RESTful API: KapsamlÄ± API desteÄŸi mevcuttur<br>â€¢ SDK'lar: iOS, Android, Web SDK'larÄ± mevcuttur<br>â€¢ Veri Entegrasyonu:<br>  - ODBC/JDBC baÄŸlantÄ± desteÄŸi<br>  - Remote sourcing ile veri Ã§oÄŸaltma olmadan entegrasyon<br>  - ETL Automated Flow aracÄ±<br>â€¢ Kanal EntegrasyonlarÄ±:<br>  - Email, SMS, Push Notification<br>  - WhatsApp Business API<br>  - Web Push, In-App mesajlaÅŸma<br>â€¢ Webhook ve Real-time Event desteÄŸi<br>â€¢ Kafka entegrasyonu iÃ§in Ã¶zel geliÅŸtirme yapÄ±labilir<br><br>API dokÃ¼mantasyonu: https://dev.dengage.com/reference/general |
| 10 | UygulamanÄ±n performans ve kaynak kullanÄ±mÄ± ile ilgili minimum ve Ã¶nerilen sistem gereksinimleri nelerdir? | Sistem gereksinimleri:<br><br>Database Server:<br>â€¢ OS: RHEL tabanlÄ± Linux daÄŸÄ±tÄ±mlarÄ±<br>â€¢ DB: PostgreSQL 12+<br>â€¢ RAM: 2x32GB + 3x4GB (toplam 5 sunucu)<br>â€¢ CPU: 2x16 CPU + 3x2 CPU (min 2.1 GHz)<br>â€¢ Disk: 3x200GB Data + 30GB OS (SSD, min 3000 IOPS)<br>â€¢ Network: 10Gig LAN, 100Mbit internet<br><br>Application Server:<br>â€¢ OS: RHEL tabanlÄ± Linux daÄŸÄ±tÄ±mlarÄ±<br>â€¢ Platform: .NET Core 3.1+<br>â€¢ BileÅŸenler: RabbitMQ, Redis, NFS, PureFTPs, Nginx<br>â€¢ RAM: 2x48GB<br>â€¢ CPU: 2x16 CPU (min 2.1 GHz)<br>â€¢ Disk: 2x200GB Data + 30GB OS (SSD, min 1500 IOPS)<br><br>Not: Bu konfigÃ¼rasyon saatte 1.000.000 mesaj gÃ¶nderimini destekler.Ã¦ |
| 11 | SLA (Service Level Agreement) ve destek sÃ¼reÃ§leriniz nasÄ±l tanÄ±mlanÄ±yor? | SLA ve destek sÃ¼reÃ§leri:<br><br>â€¢ Destek KanallarÄ±:<br>  - Online mÃ¼ÅŸteri hizmetleri portalÄ± (support ticket sistemi)<br>  - Email desteÄŸi (7 gÃ¼n/hafta Ã§alÄ±ÅŸma saatlerinde)<br>  - Mesai dÄ±ÅŸÄ± destek<br>  - Hesap yÃ¶netimi<br>â€¢ SLA Seviyeleri: SÃ¶zleÅŸmede aÃ§Ä±kÃ§a belirtilmektedir<br>â€¢ Ã‡Ã¶zÃ¼m SÃ¼releri: Problem sÄ±nÄ±flandÄ±rma ve Ã¶nceliklendirme ile tanÄ±mlÄ±<br>â€¢ Uptime Garantisi: %99.999 availability (5 global datacenter)<br>â€¢ EÄŸitim: Son kullanÄ±cÄ± eÄŸitimleri dahildir<br>â€¢ ÃœrÃ¼n GÃ¼ncellemeleri: DÃ¼zenli gÃ¼ncelleme paketleri<br><br>DetaylÄ± SLA koÅŸullarÄ± sÃ¶zleÅŸme ekinde yer almaktadÄ±r. |
| 12 | UygulamanÄ±n dokÃ¼mantasyonu, kurulum ve operasyonel yÃ¶netim rehberleri mevcut mu? | DokÃ¼mantasyon ve rehberler:<br><br>â€¢ Teknik DokÃ¼mantasyon:<br>  - API DokÃ¼mantasyonu: https://dev.dengage.com/reference/general<br>  - BaÅŸlangÄ±Ã§ Rehberi: https://dev.dengage.com/docs/getting-started<br>  - Changelog: https://dev.dengage.com/changelog<br>â€¢ Kurulum DokÃ¼mantasyonu:<br>  - Network topoloji dokÃ¼manÄ±<br>  - DB topoloji dokÃ¼manÄ±<br>  - Sistem gereksinimleri dokÃ¼manÄ±<br>â€¢ Operasyonel Rehberler:<br>  - Son kullanÄ±cÄ± eÄŸitim materyalleri<br>  - Teknik eÄŸitim dokÃ¼manlarÄ±<br>â€¢ Destek: Belirli aralÄ±klarla eÄŸitim verilmektedir<br><br>TÃ¼m dokÃ¼mantasyon sÃ¼rekli gÃ¼ncellenmektedir. |
| 13 | ÃœrÃ¼nÃ¼n test ortamÄ±, sandbox veya demo kurulumu iÃ§in teknik gereksinimler nelerdir? | Test/Demo ortamÄ± gereksinimleri:<br><br>â€¢ Test OrtamÄ±:<br>  - Test ve production hesaplarÄ± ayrÄ± olarak kullanÄ±labilmektedir<br>  - GeliÅŸtirme, test ve prod ortamlarÄ± ayrÄ±lmÄ±ÅŸtÄ±r (DTAP)<br>  - Hassas bilgileri gerÃ§ek verilerden arÄ±ndÄ±rma sÃ¼reci uygulanabilir<br>â€¢ Sandbox/Demo:<br>  - SaaS platformunda demo hesabÄ± oluÅŸturulabilir<br>  - Tam Ã¶zellikli deneme ortamÄ± sunulmaktadÄ±r<br>â€¢ POC Gereksinimleri:<br>  - Minimum konfigÃ¼rasyon ile baÅŸlanabilir<br>  - Cloud Ã¼zerinde hÄ±zlÄ± kurulum mÃ¼mkÃ¼ndÃ¼r<br>  - On-premise iÃ§in VM/container ortamÄ± yeterlidir<br><br>POC sÃ¼reci iÃ§in teknik ekibimiz destek saÄŸlamaktadÄ±r. |
| 14 | UygulamanÄ±n lisanslama modeli ve maliyetlendirme yapÄ±sÄ± nedir? | Lisanslama ve maliyet yapÄ±sÄ±:<br><br>â€¢ Lisans Modeli:<br>  - SaaS: AylÄ±k/yÄ±llÄ±k abonelik bazlÄ±<br>  - On-Premise: Perpetual veya subscription lisans seÃ§enekleri<br>â€¢ Maliyet FaktÃ¶rleri:<br>  - Aktif kullanÄ±cÄ± sayÄ±sÄ±<br>  - Mesaj hacmi<br>  - KullanÄ±lan modÃ¼ller/kanallar<br>  - Destek seviyesi<br>â€¢ 3. Parti Lisans: Platform 3. parti lisans baÄŸÄ±mlÄ±lÄ±ÄŸÄ± iÃ§ermemektedir.<br><br>DetaylÄ± fiyatlandÄ±rma teklifi, ihtiyaÃ§ analizi sonrasÄ±nda sunulmaktadÄ±r. |

---

## Technical Requirements (Ek-2)

# Ek 2 Teknik Gereksinimler

*Source: Ek-2 Teknik Gereksinimler.xlsx*


## teknikGereksinimler

*120 rows Ã— 3 columns*

| No | Sorular | Cevaplar |
| --- | --- | --- |
|  | Ä°stemci/ArayÃ¼z Ã–zellikleri |  |
| 1 | LÃ¼tfen istemci teknik mimarisi detaylarÄ±nÄ± aÃ§Ä±klayÄ±nÄ±z | Ä°stemci web tabanlÄ±dÄ±r. Herhangi bir web tarayÄ±cÄ±sÄ± Ã¼zerinden eriÅŸilebilir. |
| 2 | Desteklenen iÅŸletim sistemleri nelerdir?(Beklentiler: Microsoft Windows 7 ve Ã¼zeri, Mac OS X 10.6 Lion ve Ã¼zeri, Ubuntu Trusty Tahr ve Ã¼zeri) | Chrome v.72+, Firefox v.70+, Microsoft Edge v17+, Opera v.30+, Safari v12+) Ã§alÄ±ÅŸtÄ±rabilien herhangi bir iÅŸletim sistemi desteklenmektedir. |
| 3 | Asgari istemci gereksinimleri nelerdir?<br>   - Hard Disk<br>   - HafÄ±za<br>   - CPU<br>   - Ä°ÅŸletim Sistemi<br>   - Ekran Ã§Ã¶zÃ¼nÃ¼rlÃ¼ÄŸÃ¼ vb. | Chrome v.72+, Firefox v.70+, Microsoft Edge v17+, Opera v.30+, Safari v12+) Ã§alÄ±ÅŸtÄ±rabilien herhangi bir donanÄ±m sistemi yeterli olacaktÄ±r. |
| 4 | Ä°stemci Ã¼zerine kurulum gereksinimleri nelerdir? Client kurulumu gerekmemelidir, aÃ§Ä±klayÄ±nÄ±z.<br>   - KurulmasÄ± gereken komponentlerin listesi ve kurulum ve kullanÄ±m bilgisi<br>   - Uygulama bÃ¼yÃ¼klÃ¼ÄŸÃ¼ | Ä°stemci web tabanlÄ±dÄ±r.Herhangi bir kurulum gerektirmemektedir. |
| 5 | YazÄ±lÄ±m daÄŸÄ±tÄ±m (software distribution) gereksinimleri nelerdir? GeliÅŸtirmelerin inhouse react kÃ¼tÃ¼phanede yazÄ±lmasÄ± gerekmektedir. | YazÄ±lÄ±m daÄŸÄ±tÄ±mÄ± sÃ¶z konusu deÄŸildir. |
| 6 | LÃ¼tfen yazÄ±lÄ±m daÄŸÄ±tÄ±m (software distribution) yetenekleri hakkÄ±nda bilgi veriniz. Ãœstteki madde iÃ§in alternatif Ã¶nerilerinizi paylaÅŸÄ±nÄ±z. | YazÄ±lÄ±m daÄŸÄ±tÄ±mÄ± sÃ¶z konusu deÄŸildir. |
| 7 | ÃœrÃ¼nÃ¼n tÃ¼m browserlarda Ã§alÄ±ÅŸma yeteneÄŸi var mÄ±dÄ±r? Hangi browser versiyonlarÄ± ile Ã§alÄ±ÅŸmaktadÄ±r? Minimum versiyonlarÄ± iletiniz. | Chrome v.72+, Firefox v.70+, Microsoft Edge v17+, Opera v.30+, Safari v12+)  |
| 8 | ÃœrÃ¼nÃ¼n deÄŸiÅŸik ekran Ã§Ã¶zÃ¼nÃ¼rlÃ¼klerinde Ã§alÄ±ÅŸma yeteneÄŸi var mÄ±dÄ±r? CMS ve Websitesi iÃ§in ayrÄ± olarak detaylÄ± aÃ§Ä±klayÄ±nÄ±z. | EVET |
| 9 | ÃœrÃ¼n/Ã§Ã¶zÃ¼mÃ¼n mobil uygulamalarÄ± var mÄ±dÄ±r? Ã‡Ã¶zÃ¼mÃ¼n iÃ§erisinde kaynaklar saÄŸlanÄ±yorsa, mobil uygulamalarda yazÄ±lÄ±m geliÅŸtirmek mÃ¼mkÃ¼n mÃ¼dÃ¼r? Responsive olmasÄ± en Ã¶nemli gereklilikler arasÄ±nda yer almaktadÄ±r, detaylÄ± aÃ§Ä±klayÄ±nÄ±z. | Mobil uygulama yoktur. Mobil cihazlarda mobil tarayÄ±cÄ± Ã¼zerinden de Ã§alÄ±ÅŸmaktadÄ±r. |
| 10 | ÃœrÃ¼n birden fazla dili desteklemekte midir? Ä°ngilizce site iÃ§in kÄ±saca aÃ§Ä±klanabilir. | ArayÃ¼z ingilizcedir. |
| 11 | ÃœrÃ¼n cep telefonu Ã¼zerinden Ã§alÄ±ÅŸmakta mÄ±dÄ±r? Ã‡alÄ±ÅŸmaktaysa hangi modellerde? Mobil gÃ¶rÃ¼nÃ¼m ve deneyim ios/android versiyonlarda sorunsuz Ã§alÄ±ÅŸmalÄ±dÄ±r. | Mobil cihazlarda mobil tarayÄ±cÄ± Ã¼zerinden de Ã§alÄ±ÅŸmaktadÄ±r. |
| Server Hardware Requirements | Sunucu DonanÄ±m Ã–zellikleri |  |
| 1 | LÃ¼tfen sunucu bellek ve kapasite gereksinimlerini belirtiniz. | Topoloji DokumanÄ± EklenmiÅŸtir |
| 2 | AÅŸaÄŸÄ±da yer alan baÅŸlÄ±klarda teknik ortamlara iliÅŸkin gereksinimlerinizi belirtiniz;<br>- Ã–nerilen ortamlar (Ã–rneÄŸin; GeliÅŸtirme, ÃœrÃ¼n Testi, Entegrasyon Testi, KullanÄ±cÄ± Kabul Testi, Stres ve Performans Testi, Batch ve DÃ¶nÃ¼ÅŸtÃ¼rme Testi, CanlÄ± OrtamÄ±, disaster recovery)<br>- Her ortam iÃ§in Ã¶nerilen donanÄ±m gereksinimleri<br>- Ã–nerilen donanÄ±mlar iÃ§in iÅŸletim sistemi gereksinimleri<br>- Desteklenen/Ã–nerilen sunucu takip yazÄ±lÄ±mlarÄ± | Topoloji DokumanÄ± EklenmiÅŸtir |
| Network Requirements | AÄŸ Gereksinimleri |  |
| 1 | Ä°stemci ve sunucu arasÄ±nda kullanÄ±cÄ±ya Ã¶zel aÄŸ (dedicated network) gerekliliÄŸi var mÄ±dÄ±r? | HAYIR |
| 2 | Uygulama iÃ§in hangi aÄŸ altyapÄ±sÄ± gerekmektedir? | YÃ¼ke baÄŸlÄ± tercihen 10Gbps aÄŸ, IPv4 ve Sunucu parkÄ±na eriÅŸim iÃ§in IP/VPN SSL tÃ¼nel |
| 3 | AÄŸ Gereksinimlerini belirtiniz:<br>- Ã–nerilen bant geniÅŸliÄŸi gereksinimleri<br>- Desteklenen aÄŸ protokolleri | 10k kullanÄ±cÄ±ya, email kanalÄ± Ã¼zerinden (her mail payloadunun 100KB olduÄŸunu hesaplarsak ortalama olarak) 3-6 saatte gÃ¶nderim yapÄ±lmasÄ± durumunda:<br>100KB*1024*8 = 819.200 bit boyutunda tek bir mesaj, 10k kullanÄ±cÄ±ya 819.200x10.000= 8.192.000.000 bit gÃ¶nderimi olacak toplamda. 6 saat 21600 saniye demek. 372.260 bit/secâ€™lÄ±k bir hat iÅŸinizi gÃ¶recektir. Bu da 0,4 MBit/secâ€™lik bir hat hÄ±zÄ±na iÅŸaret eder.<br> <br>GÃ¼nlÃ¼k tek seferlik trigger edilecek journey sayÄ±sÄ± â€“ BurasÄ± zaman hassasiyetimiz olabilecek bir yer. Belirlenen eventlere gÃ¶re ortalama 100K Ã¼yeye, 1-2 dk iÃ§inde gitmek isteyebiliriz.<br>1-2 dk iÃ§inde ulaÅŸÄ±lmak istenen kanal mobil push olur diye dÃ¼ÅŸÃ¼nÃ¼yorum. Mobil push mesajlarÄ± da ortalama 5k boyutunda olduÄŸu hesabÄ±yla yola Ã§Ä±karsak: 5KB*1024*8 = 40.960 bit boyutunda tek bir mesaj, 100k kullanÄ±cÄ±ya 40.960x100.000= 4.096.000.000 bit gÃ¶nderimi olacak toplamda. 2 dakika = 120 saniye demek. 4.096.000.000/120 = 34.133.333 bit/secâ€™lÄ±k bir hat iÅŸinizi gÃ¶recektir. Bu da 32,5 MBit/secâ€™lik bir hat hÄ±zÄ±na iÅŸaret eder.<br> <br>Dijital kanal baÅŸÄ± gÃ¶nderilecek iÃ§erik Ã§eÅŸitliliÄŸi â€“ BurasÄ± mass iletiÅŸimlerde yapacaÄŸÄ±mÄ±z yer. Burada da ort.1.5 mio Ã¼yeye 10-15 dkâ€™da gidebiliriz.<br>10-15 dk iÃ§inde ulaÅŸÄ±lmak istenen kanal email olsa. Email mesajlarÄ± da ortalama 100KB boyutunda olduÄŸu hesabÄ±yla yola Ã§Ä±karsak: 100KB*1024*8 = 819.200 bit boyutunda tek bir mesaj, 1.5milyon kullanÄ±cÄ±ya 819.200x1.500.000= 1.228.800.000.000 bit gÃ¶nderimi olacak toplamda. 15 dakika = 900 saniye demek. 1.228.800.000.000 /900 = 143.111.111 bit/secâ€™lÄ±k bir hat iÅŸinizi gÃ¶recektir. Bu da 136,5 MBit/secâ€™lik bir hat hÄ±zÄ±na iÅŸaret eder.<br> <br>Bu hesaplamalar tabii ki kayÄ±psÄ±z ve TCP/IP protokolÃ¼nÃ¼n overheadleri gÃ¶zardÄ± edildiÄŸi durum, %10 arasÄ± ek header yÃ¼kÃ¼nÃ¼ telafi edecek payla 150mbit/secâ€™lik bir Ã§Ä±kÄ±ÅŸ yeterli olacaktÄ±r. |
| Data Model and Source Requirements | Veri Modeli ve Kaynak Gereksinimleri |  |
| 1 | UygulamanÄ±n tasarÄ±mda modellerin temel aldÄ±ÄŸÄ± bir Ã§erÃ§eve (framework) var mÄ±dÄ±r? | Micro Service mimarisi (tÃ¼m uygulama servisleri docker'dÄ±r) |
| 2 | LÃ¼tfen uygulamanÄ±n veri modelini belirtiniz. Veri modeli Anadolu Sigorta Mimari Ekip onayÄ±ndan geÃ§melidir. | Alttaki sheet'teki DB Topoloji dÃ¶kÃ¼manÄ±na eklenmiÅŸtir |
| 3 | Paketteki uygulamalar arasÄ±ndaki temel veri akÄ±ÅŸlarÄ± nelerdir? Ã‡izilmesi rica olunur. | Servis Topoloji DokumanÄ±nda belirtilmiÅŸtir. |
| 4 | LÃ¼ften desteklenen veri tabanlarÄ±nÄ± belirtiniz. NoSql ihtiyacÄ± yok ise Oracle kullanÄ±lmasÄ± gerekmektedir, aÃ§Ä±klayÄ±nÄ±z. | BÃ¼yÃ¼k data gerektirdiÄŸinden hem relational hem de nosql ihtiyacÄ±nÄ± aynÄ± anda giderecek bir db mimarisi yapÄ±lmÄ±ÅŸ olup Distributed PostgreSQL kullanÄ±lmaktadÄ±r. |
| 5 | LÃ¼tfen desteklenen uygulama sunucularÄ±nÄ± belirtiniz. | Servis Topoloji DokumanÄ±nda belirtilmiÅŸtir. |
| 6 | Veriler kaÃ§ adet veritabanÄ±nda yÃ¶netilmektedir? | Servis Topoloji DokumanÄ±nda belirtilmiÅŸtir. |
| 7 | LÃ¼tfen farklÄ± veritabanlarÄ±na eriÅŸim yeteneÄŸini kÄ±saca aÃ§Ä±klayÄ±nÄ±z. | Remote Source ile direkt JDBC ve ODBC baÄŸlantÄ±larÄ± Ã¼zerinden eriÅŸilebilmektedir. |
| 8 | UygulamanÄ±n Ã§alÄ±ÅŸabilmesi iÃ§in ilk veri yÃ¼klemesine ihtiyaÃ§ var mÄ±dÄ±r ? Varsa hangi veri guruplarÄ±nÄ±n kopyalanmasÄ±nÄ± beklemektesiniz? | Dijital pazarlama ekiplerinin stratejileri doÄŸrultusunda ihtiyaÃ§ duyduklarÄ±  veri setleri yÃ¼klenmeli veya uzaktan eriÅŸime aÃ§Ä±lmalÄ±dÄ±r. |
| 9 | LÃ¼tfen Ã¶nerilen paketin kullandÄ±ÄŸÄ± Ã¼st seviye mantÄ±ksal veri modelini aÃ§Ä±klamalarÄ± ile belirtiniz. | Alttaki sheet'teki DB Topoloji dÃ¶kÃ¼manÄ±na eklenmiÅŸtir |
| 10 | VeritabanÄ± tablolarÄ±nÄ± eklemek/kaldÄ±rmak mÃ¼mkÃ¼n mÃ¼dÃ¼r? | EVET |
| 11 | ÃœrÃ¼nÃ¼nÃ¼z veri modeli deÄŸiÅŸikliÄŸinde etki analizi beklenmektedir. DeÄŸiÅŸmesi gereken bir durum olduÄŸu iÃ§in etki analizinin Ã§Ä±kartÄ±lmasÄ± ve AS ekipleri ile paylaÅŸÄ±lmasÄ± beklenmektedir. | ÃœrÃ¼nÃ¼mÃ¼z aÃ§Ä±k veri mimarisine dayanmaktadÄ±r. Platformumuz Ã¼zerinde veri modeli deÄŸiÅŸimi ancak Anadolu Sigorta iÅŸ birimlerinin ihtiyacÄ± doÄŸrultusunda geniÅŸletilebilir. Aksi durumda Ã¼zerinde anlaÅŸÄ±lan veri modeli DÂ·engage tarafÄ±ndan deÄŸiÅŸtirilmez. |
| 12 | Uygulamaya veri aktarÄ±mÄ± iÃ§in kullanÄ±lan yÃ¶ntemler nelerdir? Veri aktarÄ±mÄ± gerekmesi durumunda hangi yÃ¶ntemleri kullanabilirsiniz? | API, Direct DB BaÄŸlantÄ±sÄ±, FTP dosya otomasyonu |
| 13 | Veri tabanÄ± bakÄ±mÄ± ve geliÅŸtirme iÃ§in kullanÄ±lmasÄ± gereken zorunlu uygulamaya Ã¶zgÃ¼ bir araÃ§ var mÄ±dÄ±r ? CMS veri tabanÄ± bakÄ±mÄ± ve geliÅŸtirmesi iÃ§in kullanÄ±lmasÄ± gereken uygulamaya Ã¶zgÃ¼ bir araÃ§ var mÄ±dÄ±r? | HAYIR |
| Integration Capabilities | Entegrasyon Yetenekleri |  |
| 1 | LÃ¼tfen harici sistemler (Tramer, Mernis, Efatura, Otoanaliz, UYAP, Bankalar vb.) ile entegrasyon yeteneÄŸini ve gereksinimlerini kÄ±saca aÃ§Ä±klayÄ±nÄ±z. Anadolu Sigorta uygulamalarÄ± ve 3rd party entegrasyon iÃ§in AS Gateway Ã¼zerinden eriÅŸim saÄŸlanacak olup, AS Mimari Ekibin tavsiye ettiÄŸi authentication yÃ¶ntemi ile veri akÄ±ÅŸÄ± saÄŸlanacaktÄ±r. |  |
| 2 | LÃ¼tfen web servis kullanÄ±m yeteneÄŸini kÄ±saca aÃ§Ä±klayÄ±nÄ±z. Soap servis yeteneklerinizi aÃ§Ä±klayÄ±nÄ±z. REST servis yeteneklerinizi aÃ§Ä±klayÄ±nÄ±z. | REST servis dokumantasyonumuza bu linkten eriÅŸebilirsiniz: https://dev.dengage.com/docs/dengage-cdmp-api |
| 3 | FirmanÄ±zÄ±n scheduling araÃ§larÄ± ile entegrasyon konusunda tecrÃ¼besi var mÄ±dÄ±r, varsa kÄ±saca aÃ§Ä±klayÄ±nÄ±z | Uygulama iÃ§inde Hangfire kullanÄ±lmaktadÄ±r |
| Integration Solution | Entegrasyon Ã‡Ã¶zÃ¼mÃ¼ |  |
| 1 | UygulamanÄ±zÄ±n DokÃ¼man ve Ä°Ã§erik YÃ¶netimi Sistemi ile entegrasyon gereksinimlerini belirtiniz. Ne tÃ¼r entegrasyon gereklidir (Ã¶r. online, batch). Entegrasyon iÃ§in gerekli servisleri (varsa) listeleyiniz.  |  |
| Technical Architecture | Teknik Mimari |  |
| 1 | UygulamanÄ±n yazÄ±ldÄ±ÄŸÄ± dil nesneye dayalÄ± programlamaya uygun olmalÄ±dÄ±r. Tercih ettiÄŸiniz dil nedir? Java yeteneklerinizi ayrÄ±ca aÃ§Ä±klayÄ±nÄ±z, geliÅŸtirmenin Java ile yapÄ±lmasÄ±nÄ±n sizin iÃ§in artÄ± ve eksilerini paylaÅŸÄ±nÄ±z. | Platform .Net Core ile geliÅŸtirilmiÅŸtir. Tercih edilen iÅŸletim Sistemi RHEL based linux'tÄ±r. Geri kalan tÃ¼m servisler docker Ã¼zerindedir. |
| 2 | Entegrasyon yapÄ±sÄ± ModÃ¼ler yapÄ±yÄ± destekler nitelikte olmalÄ±dÄ±r. | EVET |
| 3 | Uygulama J2EE / Java tabanlÄ± mimariyi destekliyor mu? Ä°stendiÄŸi takdirde server side geliÅŸtirmede java proglama dili kullanabilir misiniz? TecrÃ¼benizi kÄ±saca aÃ§Ä±klayabilir misiniz?  | HAYIR |
| 4 | Programlama dili nedir? Java yeteneklerinizi ayrÄ±ca aÃ§Ä±klayÄ±nÄ±z, geliÅŸtirmenin Java ile yapÄ±lmasÄ±nÄ±n sizin iÃ§in artÄ± ve eksilerini paylaÅŸÄ±nÄ±z. (CMS iÃ§in) | Platform .Net Core ile geliÅŸtirilmiÅŸtir. |
| 5 | Kaynak koda eriÅŸime izin veriyor musunuz? (CMS iÃ§in geÃ§erli) | HAYIR |
| 6 | Kaynak kodlarÄ±nÄ±n verilmesi istenmektedir, kaÃ§ uzmandan oluÅŸan nasÄ±l bir profilde yazÄ±lÄ±m iÃ§in bakÄ±m kadrosu oluÅŸturulmalÄ±dÄ±r? AS Kurumsal Web Sitesi kaynak kodlarÄ±nÄ±n AS ekipleri tarafÄ±ndan iletilecek repoda tutulmasÄ± ve gÃ¼ncellemelerin bu repo Ã¼zerinden gerÃ§ekleÅŸtirilmesi beklenmektedir. | KAYNAK KOD PAYLAÅžILMAMAKTADIR |
| 7 | Gerekli araÃ§lar ve Ã¶nerilen geliÅŸtirme kolaylÄ±klarÄ± nelerdir (kod Ã¼retimi, taslaklar, Ã¶zel derleyiciler, vb.)? Ã–nereceÄŸiniz geliÅŸtirme kolaylÄ±klarÄ±(kod Ã¼retimi,taslaklar,Ã¶zel derleyiciler) ve gerekli araÃ§lar var mÄ±dÄ±r? |  |
| 8 | CMS uygulamasÄ± Ã¼zerinde nasÄ±l Ã¶zelleÅŸtirme yapÄ±labilir ve bu Ã¶zelleÅŸtirmeler yeni versiyona nasÄ±l entegre edilebilir (Ã¼rÃ¼n gÃ¼ncelleme sÃ¼reci)? |  |
| 9 | Paketin desteklediÄŸi teknik platform nedir? (Java tabanlÄ±, Microsoft tabanlÄ±, vb.) Java yeteneklerinizi ayrÄ±ca aÃ§Ä±klayÄ±nÄ±z, Java ile yapÄ±lmasÄ±nÄ±n sizin iÃ§in artÄ± ve eksilerini paylaÅŸÄ±nÄ±z. | Platform .Net Core ile geliÅŸtirilmiÅŸtir. Ä°ÅŸletim sistemi Unix veya Windows olabilir. Harhangi bir 3rd parti lisans ihtiyacÄ± duyulmamaktadÄ±r |
| 10 | LÃ¼tfen Ã¼retim ortamÄ± iÃ§in Ã¶nerilen mimari/konfigÃ¼rasyon ÅŸemasÄ±nÄ± belirtiniz. | Topoloji DokumanÄ± EklenmiÅŸtir |
| 11 | Ã‡Ã¶zÃ¼m iÃ§ersinde 3. parti yazÄ±lÄ±m var mÄ±dÄ±r? Lisans ve gÃ¼venlik yÃ¶nÃ¼nden incelenecektir. | RabbitMQ, Redis |
| 12 | Ã‡Ã¶zÃ¼m iÃ§ersinde aÃ§Ä±k kaynak kodlu yazÄ±lÄ±m var mÄ±dÄ±r? Kurumsal Websitesi geliÅŸtirilirken aÃ§Ä±k kaynak kod kullanÄ±lma ihtiyacÄ± olduÄŸu durumda, AS Mimari Ekip onayÄ±nÄ±n alÄ±nmasÄ± ve gerekli kÃ¼tÃ¼phanelerin repoya indirilmesinin Mimari Ekipce yapÄ±lmasÄ± gerekmektedir. | Open Source mimariye gÃ¶re yazÄ±lmÄ±ÅŸtÄ±r |
| 13 | Sistem iÅŸletebilmek iÃ§in gerekli ya da kullanÄ±lmasÄ±nÄ± tavsiye edebileceÄŸiniz iÅŸletim sistemi uygulamasÄ±, yardÄ±mcÄ± program ya da Ã¼Ã§Ã¼ncÃ¼ parti yazÄ±lÄ±mlarÄ± belirtiniz. EÄŸer varsa, iÅŸletim sistemi uygulamalarÄ± ve yardÄ±mcÄ± programlar Ã¼zerinde ne tÃ¼r deÄŸiÅŸiklikler gerekmektedir? | Topoloji DokumanÄ±nda belirtilmiÅŸtir. |
| 14 | Performans arttÄ±rÄ±m talebi durumunda Ã§Ã¶zÃ¼mÃ¼nÃ¼z paralel yÃ¼rÃ¼tÃ¼mÃ¼ desteklemekte midir? | EVET |
| 15 | UluslararasÄ± koruma anlaÅŸmasÄ± (Software Escrow) var mÄ±dÄ±r? Kaynak kodlarÄ±n verilmeyeceÄŸi durumda detaylÄ± aÃ§Ä±klayÄ±nÄ±z. | Dengage 21 Ã¼lkede operasyon yapan global bir firmadÄ±r. Ã‡ok nadir durumlarda escrow anlaÅŸmalarÄ± yapar. |
| Reports | Raporlar |  |
| 1 | Uygulama ile gelen raporlarÄ±n tam listesini belirtiniz. | Statik ve dinamik raporlar olduÄŸu iÃ§in bir liste saÄŸlanamamaktadÄ±r. |
| 2 | Raporlar aÅŸaÄŸÄ±daki formatlarda saklanabilmekte midir?<br>a) MS Excel<br>b) Pdf<br>c) XML<br>d) Text<br>e) HTML | Excel, Text, HTML desteklenmektedir. |
| 3 | Rapor yaratmak iÃ§in tasarÄ±m aracÄ± var mÄ±dÄ±r? | Uygulamaya baÄŸlÄ± bÃ¼tÃ¼n modÃ¼llerin detaylÄ± raporlama ekranlarÄ± mevcuttur. AynÄ± zamanda uygulamanÄ±n kullandÄ±ÄŸÄ± tÃ¼m kanallarÄ±n tÃ¼m detaylÄ± raporlarÄ± tek bir tÄ±klama ile istenilen raporlama veritabanÄ±na Ã§Ä±kÄ±labilmektedir. Bununla beraber Query language ile istenilen rapor oluÅŸturulabilmektedir. |
| Development Architecture | Uygulama GeliÅŸtirme Mimarisi |  |
| 1 | Uygun geliÅŸtirme ortamÄ± gereksinimlerini belirtiniz | Kaynak kod paylaÅŸÄ±lmadÄ±ÄŸÄ± iÃ§in bu detaylar verilmemektedir |
| 2 | KonfigÃ¼rasyon yÃ¶netimi / takÄ±m geliÅŸtirme ortamÄ±nÄ± nasÄ±l gerÃ§ekleÅŸtirmektesiniz? | Kaynak kod paylaÅŸÄ±lmadÄ±ÄŸÄ± iÃ§in bu detaylar verilmemektedir |
| 3 | Uygulama dokÃ¼mantasyona sahip midir? Mimarinin beklediÄŸi teknik dokÃ¼manlarÄ±n hazÄ±rlanmasÄ± gerekmektedir. | Kaynak kod paylaÅŸÄ±lmadÄ±ÄŸÄ± iÃ§in bu detaylar verilmemektedir |
| 4 | CMS ile birlikte gelen Ã¶zel yaygÄ±nlaÅŸtÄ±rma araÃ§larÄ± var mÄ±dÄ±r? Varsa nelerdir? | Kaynak kod paylaÅŸÄ±lmadÄ±ÄŸÄ± iÃ§in bu detaylar verilmemektedir |
| 5 | Ã‡Ã¶zÃ¼mÃ¼nÃ¼z, her menÃ¼ adÄ±mÄ± ve Ã¶zelliÄŸinin anlatÄ±ldÄ±ÄŸÄ± bir yardÄ±m dokÃ¼manÄ± iÃ§ermekte midir? CMS tarafÄ±nda yardÄ±m dokÃ¼manÄ± hazÄ±rlanmasÄ± ve belirli aralÄ±klarla eÄŸitim verilmesi beklenmektedir. | Kaynak kod paylaÅŸÄ±lmadÄ±ÄŸÄ± iÃ§in bu detaylar verilmemektedir |
| 6 | YazÄ±lÄ±m geliÅŸtirme ortamÄ±nÄ± ve kullanÄ±lan araÃ§larÄ±nÄ± anlatÄ±nÄ±z.  | Kaynak kod paylaÅŸÄ±lmadÄ±ÄŸÄ± iÃ§in bu detaylar verilmemektedir |
| High Availability and Workload Management | YÃ¼ksek EriÅŸilebilirlik ve YÃ¼k YÃ¶netimi |  |
| 1 | Ã‡evrimiÃ§i Transaksiyon Ä°ÅŸlemi (Online transaction processing) iÃ§in ortalama yanÄ±t sÃ¼resi ne kadardÄ±r? Minimum gereksinim iletilmiÅŸtir. | Network'Ã¼nÃ¼zÃ¼n hÄ±zÄ±na veya yapÄ±lan iÅŸleme baÄŸlÄ± olarak <50ms. Transactional servislerimiz aynÄ± zamanda bulk Ã§aÄŸÄ±rma da desteklemektedir. Yani bir istekle aynÄ± ÅŸablonu yÃ¼zlerce kiÅŸiye kiÅŸiselleÅŸtirilmiÅŸ olarak gÃ¶nderebilirsiniz. |
| 2 | Ä°ÅŸlemlerin monitÃ¶r edilebilmesi iÃ§in Ã¼rÃ¼nÃ¼n saÄŸladÄ±ÄŸÄ± olanaklar nelerdir? Ä°ÅŸlemlerinin kafka transaction log'a bildirimi gerekmektedir. CMS content deÄŸiÅŸiklik iÅŸlemlerinin ise ayrÄ±ca detaylÄ± loglanmasÄ± gerekmektedir, yetenekleri detaylÄ± aÃ§Ä±klayÄ±nÄ±z. | Log'lar tek bir tÄ±klama ile istenilen veritabanÄ±na yazÄ±labilmektedir. Kafka iÃ§in ayrÄ±ca Ã¶zel geliÅŸtirme yapÄ±lmalÄ±dÄ±r. |
| 3 | Clustering / Parallel Run Ã¶zelliÄŸine engel bir durum varsa aÃ§Ä±klayÄ±nÄ±z. | YOKTUR |
| 4 | Sistemin kurtarma (recovery) stratejisini ve sistem dahilindeki kurtama olanaklarÄ±nÄ± belirtiniz. Uygulanacak kurtarma stratejisi ve kurtarma olanaklarÄ±nÄ± belirtiniz | bÃ¼tÃ¼n servisler minimum 2 sunucu Ã¼zerinde HA ve load balancing ÅŸeklinde Ã§alÄ±ÅŸmaktadÄ±r, veritabanÄ± tarafÄ±nda master + n replica ile yine HA ve yÃ¼k daÄŸÄ±lÄ±mÄ± saÄŸlanmaktadÄ±r, ayrÄ±ca gÃ¼nlÃ¼k incremental veritabanÄ± yedekleri alÄ±nmaktadÄ±r. |
| 5 | AÅŸaÄŸÄ±da belirtilenler gerektiÄŸinde geri yÃ¼klenmek Ã¼zere periyodik olarak yedeklenebilmesi gerekmektedir. AÃ§Ä±klayÄ±nÄ±z<br>a) Ã‡Ã¶zÃ¼m tarafÄ±ndan tutulan tÃ¼m veriler<br>b) TÃ¼m konfigÃ¼rasyon dosyalarÄ±<br>c) Ã‡Ã¶zÃ¼m tarafÄ±ndan tutulan tÃ¼m metadata | Ã‡Ã¶zÃ¼m istekte belirtilen tÃ¼m isterleri karÅŸÄ±lamaktadÄ±r. |
| 6 | Hata Ã§Ã¶zÃ¼mÃ¼ iÃ§in uygulama tarafÄ±ndan saÄŸlanan yardÄ±mcÄ± araÃ§lar nelerdir (hata loglarÄ±, vb.)? Graylog ile tam tÃ¼m servis Ã§aÄŸrÄ±larÄ± iÃ§in entegrasyon gerekmektedir, teknik yeteneklerinizi aÃ§Ä±klayÄ±nÄ±z. | GRAYLOG ENTEGRASYONU VARDIR |
| 7 | Yedekleme iÃ§in Ã¶nerilen Ã¶zellikler nelerdir? | VeritabanÄ± yedeÄŸi iÃ§in db topoloji dÃ¶kÃ¼manÄ±nda anlatÄ±ldÄ±ÄŸÄ± gibi ayrÄ± bir yedek sunucusu bulunmaktadÄ±r. DiÄŸer sunucu yedekleri sanallaÅŸtÄ±rma ortamÄ±nda alÄ±nmaktadÄ±r. |
| 8 | CMS ve verisinin yedeklemesi hangi yedekleme sistemleri ile entegre Ã§alÄ±ÅŸabilmektedir (Ã¶r: IBM Tivoli, vb)? | DB topoloji dÃ¶kÃ¼manÄ±nda anlatÄ±ldÄ±ÄŸÄ± gibi ayrÄ± bir yedek sunucusu bulunmaktadÄ±r. |
| 9 | ÃœrÃ¼n / uygulamanÄ±n cache sistemi in houseâ€™mÄ±dÄ±r? Yoksa 3. party bir Ã¼rÃ¼n mÃ¼dÃ¼r? CMS sistemi cache kullanmakta mÄ±dÄ±r? Evet ise hangi cache sistemi kullanÄ±lmaktadÄ±r? | Redis kullanÄ±lmaktadÄ±r |
| Security Features Provided | Sunulan GÃ¼venlik Ã–zellikleri |  |
| 1 | LÃ¼tfen sisteme giriÅŸ gÃ¼venliÄŸini aÃ§Ä±klayÄ±nÄ±z. CMS authentication yapÄ±sÄ±nÄ± aÃ§Ä±klayÄ±nÄ±z. | username, password, jwt token, 2FA |
| 2 | Veri gÃ¼venliÄŸi nasÄ±l saÄŸlanmaktadÄ±r? CMS tarafÄ±nda veri gÃ¼venliÄŸi nasÄ±l saÄŸlanmaktadÄ±r | encrypted connection string'ler, sunucular ve servisler arasÄ±ndaki iletiÅŸimin port kÄ±sÄ±tlamasÄ±, panel rest ve public eriÅŸimlerde https force etme |
| 3 | Katmanlar arasÄ± gÃ¼venli veri transferi yeteneÄŸi var mÄ±dÄ±r (SSL, TLS, vb.)? | SSL ve TLS 1.2, 1.3 DESTEKLENMEKTEDÄ°R |
| 4 | Login olunmasÄ±nÄ± gerektiren durumlarda istemci gÃ¼venliÄŸi saÄŸlanmalÄ±dÄ±r. AS mimarinin Ã¶nereceÄŸi Ã¶nlemler alÄ±nmalÄ±dÄ±r. DetaylÄ± aÃ§Ä±klayÄ±nÄ±z. ÃœrÃ¼n aÅŸaÄŸÄ±daki istemci giriÅŸ gÃ¼venliÄŸi Ã¶zelliklerini desteklemekte midir?<br>a) belirli sÃ¼re iÅŸlem yapÄ±lmadÄ±ÄŸÄ±nda otomatik Ã§Ä±kÄ±ÅŸ?<br>b) belirli sayÄ±da hatalÄ± giriÅŸten sonra kilitleme<br>c) gÃ¼venli baÄŸlantÄ±  | a) jwt token sÃ¼resine gÃ¶re otomatik Ã§Ä±kÄ±ÅŸ saÄŸlanabilir<br>b) belli sayÄ±da hatalÄ± giriÅŸ sonrasÄ± login blokajÄ± bulunmaktadÄ±r<br>c) tÃ¼m panel eriÅŸimleri https baÄŸlantÄ± ile saÄŸlanmaktadÄ±r |
| 5 | CMS login iÃ§in kullanÄ±lan gÃ¼venlik Ã¶zelliklerini belirtiniz:<br>a) Parola ÅŸifreleme<br>b) Belirli sayÄ±da denemeden sonra kullanÄ±cÄ±yÄ± pasif hale getirme<br>c) Ä°lk giriÅŸte ÅŸifre deÄŸiÅŸiklik isteÄŸi<br>d) SÃ¼resi dolan ÅŸifre iÃ§in deÄŸiÅŸiklik (parametrik gÃ¼n sayÄ±sÄ±)<br>e) Minimum karakter uzunluÄŸu<br>f) Belirli sayÄ±da deÄŸiÅŸiklikten sonra eski ÅŸifreleri kullanabilme izni<br>g) Åžifresinin sÃ¼resi dolan kullanÄ±cÄ±larÄ± otomatik pasif hale getirme | LDAP entegrasyonu ile AD Ã¼zerinde yÃ¶netilebilir |
| 6 | ÃœrÃ¼nÃ¼nÃ¼zÃ¼n diÄŸer gÃ¼venlik araÃ§larÄ± (NT gÃ¼venliÄŸi, veritabanÄ± motoru gÃ¼venliÄŸi, kurumsal yÃ¶netim araÃ§larÄ±) ile entegrasyon olanaÄŸÄ± var mÄ±dÄ±r? | LDAP entegrasyonu mevcuttur |
| 7 | ÃœrÃ¼n, kullanÄ±cÄ± profiline gÃ¶re eriÅŸimi kÄ±sÄ±tlayabilmekte midir? | EVET |
| 8 | Uygulama GÃ¼venliÄŸi ve EriÅŸilebilirliÄŸi kapsamÄ±nda, aÅŸaÄŸÄ±daki seviyelerde kullanÄ±cÄ± gÃ¼venlik kontrolÃ¼ var mÄ±dÄ±r:<br>a) ModÃ¼l seviyesinde<br>b) Rapor seviyesinde<br>c) Fonksiyonel/MenÃ¼ seviyesinde<br>d) Ä°ÅŸlem seviyesinde<br>e) Alan seviyesinde | A, C, D, E seviyesinde yetki ve eriÅŸim kontrolÃ¼ vardÄ±r. |
| 9 | AÅŸaÄŸÄ±daki alanlar iÃ§in denetleme Ã¶zelliÄŸi var mÄ±dÄ±r:<br>a) Dosya bakÄ±mÄ±?<br>b) Ä°ÅŸlemler (GÃ¼ncelleme / Ekleme / Silme)?<br>C) GÃ¼venlik eriÅŸimi (BaÅŸarÄ±lÄ± ve baÅŸarÄ±sÄ±z login giriÅŸimleri / GÃ¼venlik hatalarÄ±)? | HEPSÄ° Ä°Ã‡Ä°N VARDIR |
| 10 | CMS'in veritabanÄ± gÃ¼venlik Ã¶zelliklerini belirtiniz.<br>a) Views kullanarak?<br>b) Alan/kolon/tablo seviyesinde gÃ¼venlik kullanarak?<br>c) Dosya seviyesinde gÃ¼venlik kullanarak?<br> | hesap bazÄ±nda farklÄ± db ÅŸemasÄ±, her bir hesap iÃ§in ayrÄ± database user, alan/tablo seviyesinde kullanÄ±cÄ± yetkilendirme |
| 11 | Ã‡Ã¶zÃ¼mÃ¼nÃ¼z kullanÄ±cÄ± id'si bazÄ±nda sistem etkileÅŸimlerini kayÄ±t altÄ±na almakta mÄ±dÄ±r? CMS ve login gerektiren alanlarda kullanÄ±cÄ± id'si bazÄ±nda sistem etkileÅŸimleri kayÄ±t altÄ±na alÄ±nabilmelidir. | audit tablolarÄ±nda kullanÄ±cÄ± id'si bazÄ±nda kayÄ±t tutulmaktadÄ±r |
| 12 | Ã‡Ã¶zÃ¼mÃ¼nÃ¼z batch iÅŸlemleri kayÄ±t altÄ±na almakta mÄ±dÄ±r? Batch ile yapÄ±lan iÅŸlemlerde kayÄ±t bazÄ±nda log tutulmasÄ± yeteneklerinizi aÃ§Ä±klayÄ±nÄ±z. | bÃ¼tÃ¼n iÅŸlemler audit log olarak tutulmaktadÄ±r |
| 13 | Paket denetleme iÃ§in tÃ¼m aktiviteleri kayÄ±t altÄ±na alÄ±yor mu (kullanÄ±cÄ± ve istemci id'si ile iÅŸlemlerin kaydedilmesi)? LÃ¼tfen hangi tÃ¼r iÅŸlemlerin hangi detay seviyesinde kaydedilebildiÄŸini belirtiniz. Kafka transaction log beslenmelidir. |  |
| 14 | Ne tÃ¼r ÅŸifrelemeler kullanÄ±labilmektedir (veritabanÄ± ÅŸifreleme, vb.)? | VeritabanÄ± diskleri ÅŸifrelidir.  |
| 15 | Kod gÃ¼venliÄŸi iÃ§in ne tÃ¼r uygulamalar izlemektesiniz (SQL injection, DOS attacks, buffer overflow, vb)? | Periyodik olarak 3rd parti bir firmaya kod analizi yaptÄ±rÄ±lmaktadÄ±r. ÃœrÃ¼nÃ¼mÃ¼z bankalarda da kullanÄ±ldÄ±ÄŸÄ±ndan 0 aÃ§Ä±k policy ile ilerlemekteyiz.  |
| 16 | CMS Ã¼zerinde rol ve sorumluluklar, deÄŸiÅŸikliklerin Ã¶nceliklendirilmesi ve sÄ±nÄ±flandÄ±rÄ±lmasÄ±, etki ve onay deÄŸerlendirmeleri, deÄŸiÅŸikliklerin izlenmesi, denetim izleri, geri alma prosedÃ¼rleri, iÅŸ sÃ¼rekliliÄŸi planlamasÄ± ve benzeri deÄŸiÅŸiklik yÃ¶netimi hususlarÄ±nÄ± iÃ§eren, dokÃ¼mante edilmiÅŸ bir deÄŸiÅŸiklik yÃ¶netim Ã§erÃ§evesi uygulanmakta mÄ±dÄ±r? | Roller ve Sorumluluklar detaylÄ± bir ÅŸekilde yer almaktadÄ±r.  |
| 18 | CMS giriÅŸ iÃ§in kullanÄ±lan kullanÄ±cÄ±/ÅŸifre doÄŸrulama sisteminde parola zaman aÅŸÄ±mÄ± tanÄ±mlanmÄ±ÅŸ mÄ±dÄ±r? | Panele giriÅŸte bir expire date kullanÄ±lmamaktadÄ±r.  |
| 17 | Uygulamalar iÃ§in Test OrtamÄ± oluÅŸturulmasÄ± kapsamÄ±nda; Ãœretim ortamÄ±ndaki verilerden test veritabanÄ± oluÅŸtururken, hassas bilgileri gerÃ§ek verilerden arÄ±ndÄ±rma sÃ¼reci uygulanabilmesi gerekmektedir. ÃœrÃ¼n, oluÅŸturulan test verileri ile Ã§alÄ±ÅŸabilme yeteneÄŸine sahip midir? | test ve production hesaplarÄ± ÅŸeklinde kullanÄ±labilmektedir |
| 18 | Problem Takibi ve Ã‡Ã¶zÃ¼mÃ¼ kapsamÄ±nda; Problem yÃ¶netimi kapsamÄ±na giren problemlerin sÄ±nÄ±flandÄ±rÄ±lmasÄ±, Ã¶nceliklendirilmesi, izlenmesi iÃ§in gerekli iÅŸlemler bakÄ±m anlaÅŸmasÄ± kapsamÄ±nda belirtilmekte midir? | Evet sÃ¶zleÅŸmede SLA seviyeleri, Ã§Ã¶zÃ¼m sÃ¼releri aÃ§Ä±kÃ§a belirtilmektedir. |
| 19 | ÃœrÃ¼n, LDAP Yetkilendirmesi(Active Directory) ile uyumlu mudur? Uyumlu deÄŸilse nedenlerini aÃ§Ä±klayÄ±nÄ±z. | UYUMLUDUR |
| Usability & User Friendliness  | KullanÄ±lÄ±rlÄ±k Ã–zellikleri |  |
| 1 | Ã‡Ã¶zÃ¼mÃ¼nÃ¼z GUI (Graphic User Interface) saÄŸlÄ±yor mu? Ne tÃ¼r GUI'ler kullanÄ±lmaktadÄ±r? Mimaride hazÄ±rlanmÄ±ÅŸ react kÃ¼tÃ¼phanesi ile geliÅŸtirme yapÄ±lmasÄ± gerekmektedir. | Web arayÃ¼zÃ¼ saÄŸlanmaktadÄ±r. |
| 2 | Uygulama iÃ§erisinde navigasyon ne ÅŸekilde yapÄ±lmaktadÄ±r? KullanÄ±cÄ± dostu CMS yapÄ±sÄ±nÄ± aÃ§Ä±klayÄ±nÄ±z.<br>- Komut satÄ±rÄ±;<br>- MenÃ¼ yardÄ±mÄ± ile;<br>- Ä°ÅŸ sÃ¼reci yardÄ±mÄ± ile? | Web'deki grafiksel arayÃ¼zler Ã¼zerinden saÄŸlanmaktadÄ±r. |
| 3 | Uygulama veri alanlarÄ±nÄ± otomatik doldurularak, veri giriÅŸini en aza indirebiliyor mu? KullanÄ±cÄ± dostu CMS Ã¶zelliklerini aÃ§Ä±klayÄ±nÄ±z. | HayÄ±r |
| Operation Management | Operasyon YÃ¶netimi |  |
| 1 | Log'lar nasÄ±l izleniyor? Kafka transaction log beslenmelidir. Graylog entegre edilebilmelidir. | Log'lar Graylog'a Ã§Ä±kÄ±labilmektedir |
| 2 | Log'lar ve haraketler (transaction) iliÅŸkilendirilebiliyor mu? Kafka transaction log beslenmelidir. Graylog entegre edilebilmelidir. | Graylog |
| 3 | Log YÃ¶netim aracÄ± kullanÄ±lÄ±yor mu? Kafka transaction log beslenmelidir. Graylog entegre edilebilmelidir. | Graylog |
| 4 | Sunucu monitÃ¶rlemesi iÃ§in hangi araÃ§lar kullanÄ±lÄ±yor? Bilgi Ä°ÅŸlem MÃ¼dÃ¼rlÃ¼ÄŸÃ¼nce istenecek monitoring ajanlarÄ± kurulabilmelidir. | Zabbix, Graylog, diÄŸer ajanlar kurulabilir |
| 5 | LÃ¼tfen sunucu izleme araÃ§larÄ±nÄ± belirtiniz (Port Ä°zleme, Ä°letiÅŸim Ä°zleme, YÃ¼k Ä°zleme vb).  Bilgi Ä°ÅŸlem MÃ¼dÃ¼rlÃ¼ÄŸÃ¼ tarafÄ±ndan istenecek monitoring ajanlarÄ± kurulabilemelidir. | servis port izleme, servis monitoring iÃ§in Ã¶zel healtcheck url'leri Ã§aÄŸÄ±rÄ±lmasÄ±, db ve rabbitmq taraflÄ± uygulamanÄ±n kendi iÃ§inde monitoring servisleri bulunmaktadÄ±r |
| 6 | Hareket (Transaction) statÃ¼leri izlenebiliyor mu?  | Bunun transactional gÃ¶nderiler olduÄŸunu dÃ¼ÅŸÃ¼nerek evet |
| 7 | DiÄŸer hareket yÃ¶netim yeteneklerini belirtiniz | Soru anlaÅŸÄ±lamamÄ±ÅŸtÄ±r. |
| 8 | Hareket tarihÃ§esinde arama yapÄ±labiliyor mu? | Evet |
| 9 | Hareket dÃ¼zeltme (Transaction Compensation) nasÄ±l yapÄ±lÄ±yor? | Backoffice uygulamasÄ±ndan. Sistem kendi dÃ¼zeltmelerini kendi yapar bunun dÄ±ÅŸÄ±nda bir ÅŸey yapÄ±lamaz |
| 10 | Beklemede kalmÄ±ÅŸ hareketler (Pending Transaction) iÃ§in kullanÄ±cÄ± konsolu var mÄ±dÄ±r? | Panelden izlenebilmektedir. |
| 11 | TanÄ±mlÄ± uyarÄ±larÄ± (alert) belirtiniz | Graylogdaki tÃ¼m yetenekleri kullanabiliriz.  |
| 12 | Batch iÅŸlemlerin adÄ±mlarÄ± sÄ±rasÄ±nda baÅŸarÄ±lÄ± ve baÅŸarÄ±sÄ±z iÅŸlemler iÃ§in uygulama iÃ§ersinde bir uyarÄ± mekanizmasÄ± var mÄ±? | Evet |
| 13 | Ä°ÅŸlemler durdurulup, devam ettirilebiliyor mu? Yeniden baÅŸlatÄ±labiliyor mu? | Evet |
| 14 | LÃ¼tfen batch iÅŸlemleri izleme yeteneklerini listeleyiniz. | Panelden izlenebilmektedir. |
| 15 | LÃ¼tfen batch iÅŸlemlerin online iÅŸlemlere olasÄ± performans etkilerini aÃ§Ä±klayÄ±nÄ±z.  | Sadece sistemin batch iÅŸleri var ve performans etkilemez. |
| 16 | GÃ¼n iÃ§i batch iÅŸlemler var mÄ±dÄ±r? | Sadece sistemin kÃ¼Ã§Ã¼k batch iÅŸleri var ve performans etkilemez. |
| 17 | Batch iÅŸlem geÃ§miÅŸi nasÄ±l incelenebiliyor? | Panelden izlenebilmektedir. |
| 18 | LÃ¼tfen batch iÅŸlemleri belirtiniz | Bunu daha sonra liste olarak saÄŸlayabiliriz.  |

## tamamlayÄ±cÄ±GÃ¼venlikGereksinim

*69 rows Ã— 4 columns*

| Unnamed: 0 | Sorular | Cevaplar- Evet/HayÄ±r, OK, Mevcut DeÄŸil | AÃ§Ä±klama |
| --- | --- | --- | --- |
| 1 | Kimlik doÄŸrulama yapÄ±lÄ±yorsa kullanÄ±cÄ±lar KEY tarafÄ±ndan mÄ± oluÅŸturulmaktadÄ±r veya LDAP/AD Ã¼zerinden kimlik doÄŸrulama yapÄ±lmaktadÄ±r. | LDAP Entegrasyonu mevcuttur |  |
| 2 | Uygulama Internet'e aÃ§Ä±k mÄ±dÄ±r? | HAYIR |  |
| 3 | KullanÄ±cÄ±lar tarafÄ±ndan Kredi KartÄ± bilgisi girilmekte midir veya kredi kartÄ± ile ilgili herhangi bir iÅŸlem yapÄ±lmakta mÄ±dÄ±r?/(TCKN, KK no, CVV no, Cep Tlf, Anne kÄ±zlÄ±k soyadÄ±, Åžifre/Parola) | HAYIR |  |
| 4 | Uygulama Ã¼zerinde "Åžifremi Unuttum" bulunmakta ise https://selfservis.anadolusigorta.com.tr/itim/self/Home.do adresine yÃ¶nlendirme yapÄ±lmalÄ±dÄ±r. |  |  |
| 5 | Proje kapsamÄ±nda dosya yÃ¼kleme, indirme, transfer alanÄ±/fonksiyonu mevcut mudur? | EVET |  |
| Kimlik DoÄŸrulama |  |  |  |
| 6 | Uygulama Ã¼zerindeki tÃ¼m hesaplar aÅŸaÄŸÄ±daki kurallar dahilinde oluÅŸturulmalÄ±dÄ±r. | EVET |  |
|  | * En az 8 karakterden oluÅŸmalÄ±dÄ±r. |  |  |
|  | * KullanÄ±cÄ±lar geriye dÃ¶nÃ¼k 8 parolasÄ±nÄ± kullanamamalÄ±dÄ±rlar. |  |  |
|  | * En az 1 bÃ¼yÃ¼k harf ve 1 rakam iÃ§ermelidir. |  |  |
|  | * Åžifrede kullanÄ±cÄ± adÄ± iÃ§erilmemelidir. |  |  |
|  | * Åžifre 90 gÃ¼nde bir deÄŸiÅŸmelidir. |  |  |
|  | * TÃ¼rkÃ§e karakterler iÃ§ermemelidir. |  |  |
| 7 | KullanÄ±lan parolalar ve parolamÄ± unuttum kontrolÃ¼ne ait soru ve cevaplarÄ± gibi diÄŸer hassas veriler ÅŸifrelenmiÅŸ ÅŸekilde saklanmamalÄ±dÄ±r. | EVET |  |
| 8 | KullanÄ±cÄ±lara baÅŸlangÄ±Ã§ aÅŸamasÄ±nda daÄŸÄ±tÄ±lan parolalar, kullanÄ±cÄ±lar uygulamaya ilk giriÅŸ yaptÄ±klarÄ±nda deÄŸiÅŸtirilmeye zorlanmalÄ±dÄ±r. | HAYIR |  |
| 9 | KullanÄ±cÄ± adÄ±, parola, kredi kartÄ± bilgisi ve kontak bilgileri HTTPS protokolÃ¼ Ã¼zerinden aktarÄ±lmalÄ±dÄ±r. | EVET |  |
| 10 | KullanÄ±cÄ± adÄ± ve parola hatasÄ± alÄ±ndÄ±ÄŸÄ±nda Ã§Ä±kan mesajÄ± "GirdiÄŸiniz kullanÄ±cÄ± adÄ± ve/veya parola yanlÄ±ÅŸtÄ±r." seklinde olmalÄ±dÄ±r. | EVET |  |
| 11 | Parola gÃ¼ncelleme iÅŸlemleri iÃ§in eski parola her zaman sorulmalÄ±dÄ±r. | HAYIR |  |
| 12 | Parola unuttum formlarÄ±, gizli soru ve benzeri ek argÃ¼manlarla desteklenmelidir. | HAYIR |  |
| 13 | KullanÄ±cÄ± ÅŸirketten ayrÄ±ldÄ±ÄŸÄ±nda veya departman deÄŸiÅŸtirdiÄŸinde hesabÄ±nÄ±n ve yetkilerinin kapatÄ±lmasÄ± /deÄŸiÅŸtirilmesi iÃ§in bir akÄ±ÅŸ tanÄ±mlanmalÄ±dÄ±r. | LDAP Entegrasyonu mevcuttur |  |
| 14 | Umumi olmayan bÃ¼tÃ¼n kaynaklara ve sayfalara eriÅŸim iÃ§in kimlik doÄŸrulamasÄ± yapÄ±lmalÄ±dÄ±r. | EVET |  |
| Bilgi Toplama |  |  |  |
| 15 | Web, uygulama ve veritabanÄ± sunucularÄ±nÄ±n sistem bileÅŸenleri hakkÄ±ndaki kritik bilgiler (sunucu adÄ± ve sÃ¼rÃ¼mÃ¼, kullanÄ±lan program sÃ¼rÃ¼mÃ¼ v.b.) gizlenmelidir. | EVET |  |
| 16 | Uygulamada oluÅŸan hatalar ve uygulama sunucusu Ã¶n tanÄ±mlÄ± hata mesajlarÄ± kullanÄ±cÄ±ya detaylÄ± olarak gÃ¶sterilmemelidir. | EVET |  |
| 17 | UygulamalarÄ±n Ã¼zerinde koÅŸtuklarÄ± sunucular, servis verdikleri dizinlerin iÃ§eriklerini listelememelidir. | EVET |  |
| 18 | Kimlik doÄŸrulama yapÄ±lmÄ±yorsa arama motorlarÄ± tarafÄ±ndan gÃ¶rÃ¼ntÃ¼lenmemesi  iÃ§in robots.txt ile Ã¶nlem alÄ±nmalÄ±dÄ±r. YalnÄ±z, sayfa iÃ§erisinde kÃ¶prÃ¼lenmeyen baÄŸlantÄ±larÄ±n / dizinlerin (Ã¶rneÄŸin yÃ¶netim sayfasÄ±) gÃ¼venlik sorunu oluÅŸturmamasÄ± adÄ±na robots.txt dosyasÄ±na eklenmemesi gerekmektedir. | EVET |  |
| Oturum YÃ¶netimi |  |  |  |
| 19 | Oturum yÃ¶netimi iÃ§in kullanÄ±lan (session id, cookie v.b.) deÄŸerler her bir kullanÄ±cÄ± iÃ§in tekil(unique) olacak ÅŸekilde Ã¼retilmelidir.  Ãœretilen bu deÄŸer tahmin edilmeyecek ÅŸekilde Ã¼retilmelidir. | EVET |  |
| 20 | KullanÄ±cÄ± herhangi bir iÅŸlem yapmadÄ±ÄŸÄ± taktide oturum bilgisi 60 dakika sonra zaman aÅŸÄ±mÄ±na uÄŸrayacak ÅŸekilde yapÄ±landÄ±rÄ±lmalÄ±dÄ±r. | EVET |  |
| 21 | Uygulamalarda baÅŸarÄ±lÄ± kimlik doÄŸrulama ve tekrarlayan kimlik doÄŸrulama (re-authentication) neticesinde her zaman yeni bir oturum bilgisi oluÅŸturulmalÄ±dÄ±r. Ã‡Ä±kÄ±ÅŸ iÅŸleminden sonra da var olan oturum bilgisi geÃ§ersizleÅŸtirilmelidir. | EVET |  |
| 22 | Ä°nternet Ã¼zerinden kimlik doÄŸrulamasÄ± yapan uygulamalarda ek baÅŸka bir kontrol yoksa "CAPTCHA" kullanÄ±lmalÄ±dÄ±r. | MFA desteklenmektedir |  |
| 23 | Oturum bilgisini iÃ§eren Ã§erezlerin (COOKIE) domain ve yol (path) bilgileri ilgili site iÃ§in en uygun ÅŸekilde sÄ±nÄ±rlandÄ±rÄ±lmalÄ±dÄ±r. | EVET |  |
| 24 | KullanÄ±lan Ã§erez deÄŸerleri iÃ§in httponly parametresi tanÄ±mlÄ± olmalÄ±dÄ±r. Buna ek  olarak, HTTPS protokolÃ¼ kullanÄ±lan baÄŸlantÄ±larda kullanÄ±lan Ã§erez deÄŸerleri iÃ§in secure parametresi tanÄ±mlÄ± olmalÄ±dÄ±r.  | EVET |  |
| 25 | BaÅŸarÄ±lÄ± kimlik doÄŸrulamasÄ± sonucu eriÅŸilen uygulamalarda sistemden tekrar Ã§Ä±kmak (logout) iÃ§in gerekli linkler saÄŸlanmalÄ±dÄ±r. | EVET |  |
| 26 | YÃ¶netim paneli kullanÄ±lmakta ise BIM'e bildirilmeli ve Load Balancer'de yazÄ±lacak filtre ile sadece ÅŸirket iÃ§inden eriÅŸim yapÄ±lacak ÅŸekilde dÃ¼zenlenmelidir.(admin, yÃ¶netici, administrator, yÃ¶netim, panel v.b.). | EVET |  |
| Yetkilendirme |  |  |  |
| 27 | UygulamayÄ± Ã§alÄ±ÅŸtÄ±ran sistem kullanÄ±cÄ±sÄ±nÄ±n, hizmet verilen dizin dÄ±ÅŸÄ±ndaki yetkileri kaldÄ±rÄ±lmalÄ±dÄ±r. | EVET |  |
| 28 | VeritabanÄ± kullanÄ±cÄ±sÄ±nÄ±n sadece uygulamanÄ±n kullandÄ±ÄŸÄ± veritabanÄ± kaynaklarÄ±na  eriÅŸim hakkÄ± olmalÄ±dÄ±r. | EVET |  |
| 29 | VeritabanÄ± kullanÄ±cÄ±sÄ±nÄ±n veritabanÄ±na sadece uygulama sunucu IP adresinden baÄŸlantÄ± hakkÄ± olmalÄ±dÄ±r. | EVET |  |
| 30 | KÄ±sÄ±tlÄ± eriÅŸim gerektiren bÃ¼tÃ¼n URL'lere, fonksiyonlara, obje referanslarÄ±na, servislere, uygulama verilerine, kullanÄ±cÄ± bilgilerine, gÃ¼venlik yapÄ±landÄ±rma dosyalarÄ±na eriÅŸim denetlenmelidir. | EVET |  |
| 31 | Kaynak koda eriÅŸimin sadece yetkili kiÅŸiler tarafÄ±ndan gerÃ§ekleÅŸtirilmesi saÄŸlanmalÄ±dÄ±r. | EVET |  |
| 32 | Uygulamalar, geliÅŸtirme ortamÄ±ndan Ã¼retim ortamÄ±na aktarÄ±lÄ±rken gereksiz olan dosyalar (Ã¶rneÄŸin test kodlar, demo programlar, yedek dosyalar) silinmeli, ÅŸayet gerek yoksa kaynak kod aktarÄ±lmamalÄ± ve de aktarÄ±lacak olan kaynak kodlardaki yorum satÄ±rlarÄ± silinmelidir. AktarÄ±m esnasÄ±nda dosyalarda istenmeyen bir deÄŸiÅŸikliÄŸin olmamasÄ± garanti edilmelidir. | EVET |  |
| 33 | Uygulama Ã¼zerinden yapÄ±lan kritik iÅŸlemler hem uygulama seviyesinde hem de sunucu seviyesinde kayÄ±t altÄ±na alÄ±nmalÄ±dÄ±r. | EVET |  |
| 34 | Proje kapsamÄ±nda verilere eriÅŸim iÃ§in minimum yetki prensibi uygulanmalÄ±dÄ±r. | EVET |  |
| 35 | Proje kapsamÄ±nda loglar, hata mesajlarÄ± hassas veri iÃ§ermemelidir. (KiÅŸisel veri, kart verileri, sistem detaylarÄ±, oturum anahtarlarÄ± veya kullanÄ±cÄ± hesap bilgileri vb.) | EVET |  |
| 36 | Uygulama Ã¼zerindeki kullanÄ±cÄ± yetki ve rolleri iÃ§in rol-yetki matrisleri oluÅŸturulmalÄ±dÄ±r. | EVET |  |
| 37 | Proje kapsamÄ±nda yeni bir rol, yetki atamasÄ± gerekiyorsa talep-onay mekanizmasÄ± iÅŸletilmelidir.  | EVET |  |
| 38 | Proje kapsamÄ±nda dÄ±ÅŸ firma baÄŸlantÄ±sÄ± ya da veri paylaÅŸÄ±mÄ± bulunuyor mu? EÄŸer bulunuyorsa gÃ¼venli baÄŸlantÄ± ve paylaÅŸÄ±m yÃ¶ntemleri kullanÄ±lmalÄ±dÄ±r. | VERI PAYLASIMI BULUNMUYOR |  |
| Veri Denetimi |  |  |  |
| 39 | SQL enjeksiyonuna karÅŸÄ± prepared statement/parameterized query/bind variables/pozitif veri kontrolÃ¼ yÃ¶ntemlerinden biri veya birkaÃ§Ä± kullanÄ±lmalÄ±dÄ±r. | EVET |  |
| 40 | XSS saldÄ±rÄ±larÄ±na karÅŸÄ± bÃ¼tÃ¼n kullanÄ±cÄ± girdileri dÄ±ÅŸarÄ± aktarÄ±lmadan Ã¶nce sunucu tarafÄ±nda Ã¶zel karakter kodlama (output encoding) iÅŸleminden geÃ§irilmelidir. GÃ¼venlik seviyesini artÄ±rmak iÃ§in bu iÅŸlem kullanÄ±cÄ± girdilerinin tip, uzunluk, iÃ§erik denetlemesi yapÄ±larak desteklenebilir. | EVET |  |
| 41 | KarÅŸÄ±dan dosya yÃ¼kleme iÅŸlemlerinde yÃ¼klenilen dosya Ã¼zerinde isim, boyut, tip ve iÃ§erik kontrolÃ¼ yapÄ±lmalÄ±dÄ±r. | EVET |  |
| 42 | KullanÄ±cÄ±dan gelen CR/LF karakterleri uygulama tarafÄ±nda olduklarÄ± gibi HTTP cevap baÅŸlÄ±klarÄ±nda kullanÄ±lmamalÄ±dÄ±r. | EVET |  |
| 43 | Proje kapsamÄ±nda yasal uyum ve ÅŸirket standartlarÄ± gereÄŸi korunmasÄ± gereken veriler(adres,tckn,kredi kartÄ±,cep tel vb.) maskelenmelidir. | EVET |  |
| 44 | Proje kapsamÄ±nda hassas verilerin iletilmesi iÃ§in gÃ¼venli iletiÅŸim yÃ¶ntemleri ve ÅŸifreleme standartlarÄ± kullanÄ±lmalÄ±dÄ±r. (Web servisler, depolama cihazlarÄ±, dosya paylaÅŸÄ±m ortamlarÄ± vb.) | EVET |  |
| 45 | Proje kapsamÄ±nda kimlik doÄŸrulama iÃ§in kullanÄ±lan gizli bilgiler uygulama iÃ§inde hard-coded tutulmamalÄ±dÄ±r. | EVET |  |
| 46 | Proje kapsamÄ±nda uygulamalarÄ±n kullandÄ±ÄŸÄ± ÅŸifreleme anahtarÄ±, db kullanÄ±cÄ±sÄ±, web servis kullanÄ±cÄ±sÄ±, servis account kullanÄ±cÄ±sÄ± vb. ÅŸifreler kurumsal ÅŸifre kasasÄ±nda saklanmalÄ±dÄ±r. | EVET |  |
| Web Servisleri |  |  |  |
| 47 | SOAP, Restful, XML-RPC gibi teknolojilerle geliÅŸtirilmiÅŸ web servislerine  eriÅŸimlerde kimlik doÄŸrulama kontrolÃ¼ uygulanmalÄ±dÄ±r. | EVET |  |
| YapÄ±landÄ±rma YÃ¶netimi |  |  |  |
| 48 | Uygulama Ã§atÄ±sÄ±, veritabanÄ±, uygulama sunucusu ve web sunucusu gibi kullanÄ±lan yazÄ±lÄ±mlarÄ±n  gÃ¼venlik yamalarÄ± en Ã¼st seviyede olmalÄ±dÄ±r. | EVET |  |
| 49 | GerekmedikÃ§e POST/GET dÄ±ÅŸÄ±ndaki HTTP metotlarÄ±na izin verilmemelidir. | EVET |  |
| 50 | Ana sistem iÃ§in gereksiz olan dosyalara (Ã¶rneÄŸin yedekleme, arÅŸiv, test, geliÅŸtirme iÃ§in kullanÄ±lan dosyalar) eriÅŸim engellenmeli ve sistemdeki gereksiz uygulamalar (Ã¶rneÄŸin Ã¶n tanÄ±mlÄ± sunucu sayfalarÄ±, demo uygulamalar) kaldÄ±rÄ±lmalÄ±lar. | EVET |  |
| 51 | Ã–n tanÄ±mlÄ± kullanÄ±cÄ± hesaplarÄ± sistemden, veritabanÄ±ndan ve uygulamadan kaldÄ±rÄ±lmalÄ±dÄ±r. | EVET |  |
| 52 | Hassas bilgiler iÃ§eren web sayfalarÄ±nÄ±n tarayÄ±cÄ±larda belleÄŸe alÄ±nmamasÄ± iÃ§in autocomplete, cache-control, pragma gibi gerekli HTTP/HTML baÅŸlÄ±klarÄ± kullanÄ±lmalÄ±dÄ±r. | EVET |  |
| 53 | GÃ¼venli web trafiÄŸi iÃ§in (SSL) gÃ¼Ã§lÃ¼ ÅŸifreleme algoritmalarÄ± kullanÄ±lmalÄ±dÄ±r, gÃ¼vensiz algoritmalar inaktif hale getirilmelidir. TLS 1.2 ile Ã§alÄ±ÅŸabilir olmalÄ±dÄ±r. | EVET |  |
| 54 | SSL sunucusunun "renegotiation" Ã¶zelliÄŸi kapatÄ±larak sunucu servis dÄ±ÅŸÄ± bÄ±rakma ve MITM saldÄ±rÄ±larÄ±na karÅŸÄ± korunaklÄ± hale getirilmelidir. | EVET |  |
| 55 | X-Content-Type-Options, Expect-CT, Strict-Transport-Security, Anti Clickjacking X-Frame Options, X-XSS-Protection,Referrer-Policy,Content-Disposition(API)n BaÅŸlÄ±klarÄ± bulunmalÄ±dÄ±r. | EVET |  |
| 5 |  |  |  |

---

## K8s/Server/Storage/Backup

# Sunucu, K8s, Depolama ve Yedekleme Soru Setleri

*Source: Sunucu, K8s, Depolama ve Yedekleme Soru Setleri.xlsx*


## K8s Ortam Talebi

*26 rows Ã— 15 columns*

| Unnamed: 0 | ORTAM | Unnamed: 2 | Unnamed: 3 | Tahmini Ä°ÅŸ YÃ¼kÃ¼ne Ait | Unnamed: 5 | Unnamed: 6 | Unnamed: 7 | Unnamed: 8 | Unnamed: 9 | Unnamed: 10 | Unnamed: 11 | Unnamed: 12 | Unnamed: 13 | Unnamed: 14 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | Namespace | Cluster  | Ortam TÃ¼rÃ¼ | Deployment, StatefullSet TanÄ±mlanmÄ±ÅŸ tahmini CPU deÄŸerleri |  |  | Deployment, StatefullSet TanÄ±mlanmÄ±ÅŸ tahmini Memory deÄŸerleri |  |  | StorageClass |  |  |  |  |
| Proje/ihtiyaÃ§ nedeni | Adet | TÃ¼r (Prod,test,prep vb.) | Local/DMZ/Ä°ÅŸtirak/DRC | CPU Core | CPU Request | CPU Limit | RAM | Memory Request | Memory Limit | Toplam Depolama AlanÄ± | GPU ihtiyacÄ± (var ise Model/Memory miktarÄ±) | Yedeklenecek mi? | Disk performans ihtiyacÄ± var mÄ±? | Ä°ÅŸ kritik mi? |
| Dengage - k8s master | 2 | Prod | Local | 4 |  |  | 8GB |  |  | 50GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage - k8s master | 1 | Prod | DRC | 4 |  |  | 8GB |  |  | 50GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage - k8s worker | 2 | Prod | Local | 16 |  |  | 64GB |  |  | 550GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage - k8s worker | 1 | Prod | DRC | 16 |  |  | 64GB |  |  | 550GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage - mmp 1 | 1 | Prod | Local | 8 |  |  | 16GB |  |  | 300GB | HayÄ±r | Evet | Evet | Evet |
| Dengage - mmp 2 | 1 | Prod | DRC | 8 |  |  | 16GB |  |  | 300GB | HayÄ±r | Evet | Evet | Evet |
| Dengage DB Master | 1 | Prod | Local | 32 |  |  | 64GB |  |  | 400GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage DB Replica 1 | 1 | Prod | Local | 32 |  |  | 64GB |  |  | 400GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage DB Replica 2 | 1 | Prod | DRC | 32 |  |  | 64GB |  |  | 400GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage - DB Backup | 1 | Prod | Local | 4 |  |  | 8GB |  |  | 900GB | HayÄ±r | HayÄ±r | HayÄ±r | Evet |
| Dengage - DB HA | 1 | Prod | Local | 2 |  |  | 4GB |  |  | 50GB | HayÄ±r | HayÄ±r | HayÄ±r | Evet |
| Dengage - DB HA | 1 | Prod | DRC | 2 |  |  | 4GB |  |  | 50GB | HayÄ±r | HayÄ±r | HayÄ±r | Evet |
| Dengage - k8s master | 2 | Test | Local | 2 |  |  | 2GB |  |  | 50GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage - k8s master | 1 | Test | DRC | 2 |  |  | 2GB |  |  | 50GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage - k8s worker | 2 | Test | Local | 2 |  |  | 4GB |  |  | 150GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage - k8s worker | 1 | Test | DRC | 2 |  |  | 4GB |  |  | 150GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage - mmp 1 | 1 | Test | Local | 2 |  |  | 4GB |  |  | 50GB | HayÄ±r | Evet | Evet | HayÄ±r |
| Dengage - mmp 2 | 1 | Test | DRC | 2 |  |  | 4GB |  |  | 50GB | HayÄ±r | Evet | Evet | HayÄ±r |
| Dengage DB Master | 1 | Test | Local | 4 |  |  | 8GB |  |  | 100GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage DB Replica 1 | 1 | Test | Local | 4 |  |  | 8GB |  |  | 100GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage DB Replica 2 | 1 | Test | DRC | 4 |  |  | 8GB |  |  | 100GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage - DB Backup | 1 | Test | Local | 2 |  |  | 2GB |  |  | 300GB | HayÄ±r | HayÄ±r | HayÄ±r | HayÄ±r |
| Dengage - DB HA | 1 | Test | Local | 2 |  |  | 2GB |  |  | 50GB | HayÄ±r | HayÄ±r | HayÄ±r | HayÄ±r |
| Dengage - DB HA | 1 | Test | DRC | 2 |  |  | 2GB |  |  | 50GB | HayÄ±r | HayÄ±r | HayÄ±r | HayÄ±r |

## DonanÄ±m Ä°ster Tablosu

*24 rows Ã— 11 columns*

| Proje/ihtiyaÃ§ nedeni | Adet | Lokasyon(KTBU/DRC) | Cluster(Local/DMZ) | CPU Core | RAM | Disk | GPU ihtiyacÄ± (var ise Model/Memory miktarÄ±) | Yedeklenecek mi? | Disk performans ihtiyacÄ± var mÄ±? | Ä°ÅŸ kritik mi? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dengage - k8s master | 2 | KTBU | Local | 4 | 8GB | 50GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage - k8s master | 1 | DRC | Local | 4 | 8GB | 50GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage - k8s worker | 2 | KTBU | Local | 16 | 64GB | 550GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage - k8s worker | 1 | DRC | Local | 16 | 64GB | 550GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage - mmp 1 | 1 | KTBU | Local | 8 | 16GB | 300GB | HayÄ±r | Evet | Evet | Evet |
| Dengage - mmp 2 | 1 | DRC | Local | 8 | 16GB | 300GB | HayÄ±r | Evet | Evet | Evet |
| Dengage DB Master | 1 | KTBU | Local | 32 | 64GB | 400GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage DB Replica 1 | 1 | KTBU | Local | 32 | 64GB | 400GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage DB Replica 2 | 1 | DRC | Local | 32 | 64GB | 400GB | HayÄ±r | HayÄ±r | Evet | Evet |
| Dengage - DB Backup | 1 | KTBU | Local | 4 | 8GB | 900GB | HayÄ±r | HayÄ±r | HayÄ±r | Evet |
| Dengage - DB HA | 1 | KTBU | Local | 2 | 4GB | 50GB | HayÄ±r | HayÄ±r | HayÄ±r | Evet |
| Dengage - DB HA | 1 | DRC | Local | 2 | 4GB | 50GB | HayÄ±r | HayÄ±r | HayÄ±r | Evet |
| Dengage - k8s master | 2 | KTBU | Local | 2 | 2GB | 50GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage - k8s master | 1 | DRC | Local | 2 | 2GB | 50GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage - k8s worker | 2 | KTBU | Local | 2 | 4GB | 150GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage - k8s worker | 1 | DRC | Local | 2 | 4GB | 150GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage - mmp 1 | 1 | KTBU | Local | 2 | 4GB | 50GB | HayÄ±r | Evet | Evet | HayÄ±r |
| Dengage - mmp 2 | 1 | DRC | Local | 2 | 4GB | 50GB | HayÄ±r | Evet | Evet | HayÄ±r |
| Dengage DB Master | 1 | KTBU | Local | 4 | 8GB | 100GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage DB Replica 1 | 1 | KTBU | Local | 4 | 8GB | 100GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage DB Replica 2 | 1 | DRC | Local | 4 | 8GB | 100GB | HayÄ±r | HayÄ±r | Evet | HayÄ±r |
| Dengage - DB Backup | 1 | KTBU | Local | 2 | 2GB | 300GB | HayÄ±r | HayÄ±r | HayÄ±r | HayÄ±r |
| Dengage - DB HA | 1 | KTBU | Local | 2 | 2GB | 50GB | HayÄ±r | HayÄ±r | HayÄ±r | HayÄ±r |
| Dengage - DB HA | 1 | DRC | Local | 2 | 2GB | 50GB | HayÄ±r | HayÄ±r | HayÄ±r | HayÄ±r |

## Veri Depolama Ã‡Ã¶zÃ¼mleri

*6 rows Ã— 3 columns*

| Veri Depolama Ã‡Ã¶zÃ¼mleri Soru Seti | Unnamed: 1 | Unnamed: 2 |
| --- | --- | --- |
| No |  | Cevap |
| 1 | Yedeklenecek mi? Ne sÄ±klÄ±kla ve ne kadar tutulacak? | Sistem, gÃ¼nde en az bir kez veya ihtiyaca gÃ¶re belirlenecek periyotlarda otomatik olarak yedeklenmektedir. Ä°ki tam yedek arasÄ±ndaki veri gÃ¼venliÄŸi WAL (Write-Ahead Logging) yÃ¶ntemiyle saÄŸlanÄ±r; olasÄ± bir arÄ±za durumunda sistem en gÃ¼ncel yedek noktasÄ±na geri dÃ¶ndÃ¼rÃ¼lerek WAL dosyalarÄ± Ã¼zerinden tam veri bÃ¼tÃ¼nlÃ¼ÄŸÃ¼ korunur. |
| 2 | Disk performans ihtiyacÄ± var mÄ±? | UygulamanÄ±n yÃ¼ksek iÅŸlem hacmi ve veri tutarlÄ±lÄ±ÄŸÄ± gereksinimleri nedeniyle yÃ¼ksek performanslÄ± (IOPS deÄŸeri yÃ¼ksek) SSD/NVMe disklerin kullanÄ±lmasÄ± zorunludur. |
| 3 | Disk Kapasite ihtiyacÄ± ne kadar? | Sistem kurulumu iÃ§in baÅŸlangÄ±Ã§ aÅŸamasÄ±nda tÃ¼m sunucularÄ±n toplamÄ± yaklaÅŸÄ±k 4TB kullanÄ±labilir alan yeterlidir; ancak veritabanÄ± bÃ¼yÃ¼me hÄ±zÄ±na baÄŸlÄ± olarak bu alanÄ±n Ã¶lÃ§eklenebilir bir yapÄ±da sunulmasÄ± Ã¶nerilir. |
| 4 | YÄ±llÄ±k data bÃ¼yÃ¼me oranÄ± nedir? | YÄ±llÄ±k veri bÃ¼yÃ¼me oranÄ±, kurumun aktif mÃ¼ÅŸteri kontak sayÄ±sÄ± ve kampanya gÃ¶nderim sÄ±klÄ±ÄŸÄ±na baÄŸlÄ± olarak deÄŸiÅŸkenlik gÃ¶stermektedir. |
| 5 | Disk ProtokolÃ¼ (NFS,S3,CIFS,FC vb.) ne olmalÄ±? | Kurumun altyapÄ± standartlarÄ±na uygun endÃ¼striyel protokoller tercih edilebilir; ancak performans ve veri kararlÄ±lÄ±ÄŸÄ± aÃ§Ä±sÄ±ndan tÃ¼m uygulama sunucularÄ±nda disk formatÄ±nÄ±n XFS olarak yapÄ±landÄ±rÄ±lmasÄ± teknik bir gerekliliktir. |

---

## Technology Product Evaluation

# Dengage Technology Product Evaluation v01

*Source: Dengage Technology Product Evaluation v01.xlsx*


## Company

*13 rows Ã— 2 columns*

| Item | Vendor Response |
| --- | --- |
| Please provide an Ä±verview of company and history. | Dengage (Dengage Limited) is a Private Limited Company that started its operations in January 2018. It is owned by Aman Dotani (50%) and Itri Osman Tufanogullari (50%) and provides a Customer Data and Engagement Platform.<br>The Dengage platform provides an enterprise-ready cross-channel personalized engagement platform that marketers love and the whole organization trusts. Allianzâ€™s marketing can target the right audience across channels, grow revenue, and build customer relationships that â€˜make truly great things happen.â€™<br>With the Dengage Customer Driven Marketing Platform (CDMP) Allianz will be able to empower its sales and marketing teams to lead the customer experience by centralizing all required marketing and sales data, assets, and channels under one platform. The Dengage Customer Driven Marketing Platform will empower Allianz to deliver a world-class customer experience by unifying your data, engaging the right audience, and analyzing performance across all channels and devices. <br>In addition to providing Allianz with a rich set of out-of-the-box solutions, Dengage Customer Driven Marketing Driven Platformâ€™s data-agnostic approach, integration capabilities, and AI/Machine Learning capabilities suppresses the complexity of the marketing ecosystem. This will allow Allianz to easily use all available data in the organization to improve the sales pipeline, boost productivity, and improve customer satisfaction by delivering personalized and seamless engagement when prospects and customers are most receptive through their preferred channels.  |
| Please provide the list of products range and services your company offers. | see Dengage CXDP.pdf, Dengage CDP Overview.pdf, Dengage CDP Overview.pdf, Dengage Marketing Automation Overview.pdf<br>Customer Data Platform, OmniChannel Marketing Automation Platform, Digital Channels (Email, SMS, Web Push, Mobile Push, OnSite & In-App Messaging Channels) |
| Could you please provide audited company financials for the last 3 years? | Can be shared under a signed NDA. |
| Where is your HQ located | London, UK |
| Any other offices besides HQ?  | Istanbul/Turkey, Lahore/Pakistan, Moscow/Russia, Dubai/UAE, London/UK |
| If yes, please provide following for each office<br>- Office location<br>- Nb of Employees<br>- Coverage i.e Sales, R&D, Development, Suppport, etc. | UAE DENGAGE DIGITAL TECHNOLOGIES L.L.C - 6 Employees - Sales<br>PAKISTAN ENGAGE DIGITAL SERVICES (SMC-PRIVATE) LIMITED - 31 Employees - Development - Support - Sales<br>RUSSIA D-ENGAGE LLC - 3 Employees - Sales<br>UK D-ENGAGE LIMITED - 5 Employees - Sales<br>TR Dengage Interaktif Dijital Teknoloji Hizmetleri ve Pazarlama A.S. - 54 Employees - Development - R&D - Support - Sales |
| Please provide information of the number of company employees by function (technical and non-technical). | 94 Employees - 16 Contractors (60 Technical - 50 Non-Technical)  |
| Please provide information as to the years of experience as well as retention rate of your key technical people in the last two years  | Average of 3 years of tenure, %90 retention rate |
| Parent Company: Please provide information as to whether the organization is independent or part of a larger conglomerate. If the latter, please provide details on the holding company. | All DÂ·engage entities are %100 owned by Dotu Limited UK. |
| Please provide information as to whether the organization is the package manufacturer, reseller or value-added resellers (VARs). If the latter two, please also provide details of the company. | Vendor |
| Please provide information of any company that merged with or was purchased by the organization. | NONE |
| Company Growth: Please provide information regarding the growth of the company per year, for the last 5 years, in terms of locations and staff numbers | Founded in 2018 DÂ·engage is expanding very rapidly. Operating in 5 different regions in over 25+ countries, YoY growth rate is %70.  |
| Please provide information of any alliance or affiliation that with which the organization partners (e.g., tool or equipment supplier, standard groups, industry groups). |  |

## Product

*14 rows Ã— 3 columns*

| Item | Vendor Response | Yorum |
| --- | --- | --- |
| What is the first shipment date of the product for the original version? | 2019 May |  |
| What is the last shipment date of the product for the current version? | 2024 Aug |  |
| Was the products acquired or developed internlly? | All stack is developed internally, no 3rd party license (including server OS) is required |  |
| How many live customers do you have for this product? (It would be great if you could provide region wise) | 76 Clients TR, 11 UAE, 24 PAK, 30 UK, 8 RU regions |  |
| As and when needed, will you be able to provide contacts for 2 reference customers? | Yes |  |
| Please provide average schedule/ time for Major version (evolutive maintenance), Minor version (corrective maintennace) and bug fix releases? | Major releases are planned to be rolled out every 6 months for onprem deployments, every 3 months for cloud deployments. Minor releases are planned monthly |  |
| What is the product support schedule? When the end-of-life period is expected for the version being delivered? i.e. Last two major versions are supported | We have a single release on production that is supported and updated for life time. |  |
| Could you please provide future roadmap for the major enhancement / transformation for the subject product? | Can be shared under a signed NDA. |  |
| Is extended support offered, with a cost, if an unsopported is being used? | Yes |  |
| Does the product have any certification against industry, international or defacto technical standards i.e. ISO9001, PCI-SSD,etc.? | ISO 27001, ISO 22301 |  |
| Does the product offer a pre-defined database which contains the best market practices gathered over the years? | Yes |  |
| Do you provide license for DEV, TEST and Pre-Prod environments without an additional cost? | Yes |  |
| Do you support ESCROW agreement and is the source code regularly deposited to ESCROW (at your own cost)? | No |  |
| What is the size of the development team dedicated to enhancement of the this product? | 60 technical employees |  |

## Technology

*55 rows Ã— 3 columns*

| Category | Item | Vendor Response |
| --- | --- | --- |
| Technology Standards & Architechture | Please provide high level context model, application architecure and topology of the product. Indicate each tiers, inter-process communication protocols used, distributed object processing, message oriented middeware, etc. | See reference topology attached. CDMP-Reference Topology & Specs.pdf & CDMP Service Topology.pdf |
|  | Does the poduct support N-Tier design? | Yes |
|  | What are the software languages (C++, .Net, C#, Java) and frameworks / libaries (Spring Boot, AngulaJS, NextJS, etc.) used to develop each tier? Please specify the versions | C#, AngularJS, Distributed Postgresql |
|  | If supported, what are the software languages for mobile and tablet devices? | Native, React, Cordova, Flutter |
|  | Indicate the key design paradigms used in the construction of the system. Include any information regarding their contribution to coupling, functional cohesion, testability, scalability and  configurability |  |
|  | Does the product architecture support multi-threading, multi-tasking, or parallel processing over a distributed architecture? | Yes |
|  | Does the produt support seperation of eact tiers whereas presentation, application and database layers are all installed on different servers and networkds each secured with network firewalls? | Yes |
|  | Does the product make use of any open license sofwtare? | Yes |
|  | Does the product utilize any distributed transaction standards i.e. JTA, Saga, 2-Phase Commit, etc. | Saga |
|  | Does the product utilize caching? Please specify which objects are cashed, cashing algorithms supported, and if distributed cashing is supported? | No, we are utilizing queue mechanisms instead of caching. |
|  | Please specify if the product is cloud-native? Can it be deployed onto any containarization platform? | Yes |
|  | Does the product support any industry standard container orchestration tool? Please explicitly specify if it supports OpenShift or not. | Kubernetes, OpenShift. See CDMP Openshift Service Descriptions.pdf |
|  | Describe the scalibility of the product - vertically or horizontally? To what granularity level can it be horizontally scaled? For instance, can each service or component can be horizontally scaled?  | Fully horizontally scalable |
|  | Does the product support multi-language / internationalization? | Yes |
|  | Does the product provide any customization mechanism and/or extendibility APIs? Please elaborate in detail as to how the product supports custom developments. | Yes, custom nodes and APIs can be developed through professional services. |
|  | Does the UI delivered though Desktop Application or Web Client? | Web Client |
|  | If Web Client, what are the browsers and versions that are supported? | All versions are supported |
|  | Is the client UI a thin client or thick client? For avoidance of doubt, thin client means there are no business logics at client side or presentation layer; the UI only presents the data, gathers the user actions and sends it to backend, and the backend performs all the business logic.  | Thin client, no logic on the frontend |
|  | Does the product opening the UI screens within Allianz Turkey systems e.g. iFrame? | can be developed through professional services. |
|  | Does the product support White labelling with Allianz Turkey logo, colors, fonts, etc.? | can be developed through professional services. |
| Integrations & APIs | What are the external communication protocols supported? Please specify the standards i.e. Soap, Rest, batch file, etc. | Rest APIs, Batch file processing |
|  | What are the message standards supported (ASCII, CSV, XML, Json, etc.) | CSV, JSON |
|  | Does the product exposes its services, events and actions (e.g static data import, transaction approval, etc.) through industry standardized APIs?  | Yes |
|  | Does the product APIs conform with OpenAPI indusrty standards? | Yes |
|  | Does it require extra license and fee to use any of those APIs? | No |
|  | Does the product support exporting any key data or events to any external mechanisms? Please specify the export mechanisms e.g. file, web service, MQ, Database, etc. | Exports can be done with FTP File transfer, Web Service, Direct DB connection through automations |
|  | Does the product support integration with external BPM tool for orchestration of the business logic? | Yes |
|  | Does the product perform its own scheduling or makes use of an enterprise scheduler? If an enterprise scheduler is used, please indicate which products can be used (e.g. Quartz, Tivoli, Control EM etc.) | Own scheduling |
| High Availability & Resilience | Can the application be configured to run in a clustered environment on the main-site? i.e. In case of a server or hardware failure, the system can continue to service through the enduring nodes | Yes fully redundant architecture is supported also Disaster Recovery is aslo supported |
|  | Does the product supports HA & scalibility through 3rd party clustering colutions or container orchestration tools? Please specify the names. | Yes, Dengage supports high availability (HA) and scalability through third-party clustering solutions and container orchestration tools.<br>	1.	Kubernetes <br>	2.	Docker Swarm <br>	3.	Redis Cluster<br>	4.	HAProxy |
|  | Does the product supports load balancing techniques  to distribute workload across multiple nodes / containers? Please also specify if external load balancers or container orhestration tools supported. | Yes. External LBs are supported |
|  | Does the system supports automatic replication and automatic recovery of the failed instances - instead of manuel intervention? | Yes |
|  | Does the system support multi-site Disaster Recovery. Please specify if Active-Active or Active-Passive (Warm) or  Active-Passive (Cold) DR is supported. | Active-Passive (Warm) is supported |
|  | Does the product support automated back up (Full or delta) and automated restore? | Yes |
|  | Does the product support archival / purging mechanism for historical transactions? Please specify the technical details (i.e. logical or physical archival), as well as whether it supports automated archival or manuel. | Automatic logical archiving is supported |
|  | Does the product support restorateion / rollback o any archived data? | Yes |
|  | Does the product operate 24 hours? Does it require downtime or EOD processes where the product functionalities cannot be used? | 7/24 operation is supported. %99,999 of uptime is guaranteed. |
|  | Does the product provide any monitoring mechanism compliant and supported by any enterprise monitoring tools in the industry e.g. Open View, DynaTrace, AppDynamics? | Graylog is supported |
|  | Does the product have detailed monitoring guide where all critical services, components, ports and log patterns are describe and explained as to how to configure an acceptable level of monitoring? | Yes |
| Infrastructure | List the hardware platforms and Operating Systems (incl. versions) for which the product is certified and/or supported. | See reference topology attached CDMP-Reference Topology & Specs.pdf |
|  | Does the product support installation on virtulization? Please specify ig any limitations. | Yes supported |
|  | Indicate if the product requires / assumes any network infrastructure or other connectivity for deployment - e.g. Specific VLAN configurations, load balancer, reverse HTTP proxies etc. - including in a high available scenario | See reference topology attached CDMP Service Topology.pdf |
|  | List the relational or NoSQL databases or other data stores and versions for which the product is certified and/or supported. | Postgre SQL |
|  | List the application and web servers and versions for which the product is certified and/or supported. | See reference topology attached CDMP-Reference Topology & Specs.pdf |
|  | Please provide minimum and recommended hw requirements (nb of hardware, memory, CPU, etc). Kindly attach the document to the mail. | See reference topology attached CDMP-Reference Topology & Specs.pdf |
|  | Does the product require installation of any other software? | No |
|  | Please provide technical documentation / diagrams, for the system including: the client-server architecture, the network & communication architecture, recommended hardware specification, etc. | See reference topology attached CDMP-Reference Topology & Specs.pdf & CDMP Service Topology.pdf |
| Quality & Performance | Does the product have any Code Quality or Testing cetificates from an independent accreditations? | No |
|  | Does the product have any performance benchmark and test results conducted internally or externally? | Yes |
|  | Does the product support any test automation tool in the industry? | Yes |
|  | Does the product support any performance load test tool in the industry? | Yes |
|  | What is your unit test's code coverage percentage ? Could you provide any evidence from your build tools ?  | 0.75 |
| Deployment | Does the product support any industry standard deployment tools for automated deployment and rollback? | Yes |
|  | Do you offer Software as a Service with Private Cloud? Please elaborate? | No, we provide on-premise deployment in Client's Data Center |
|  | Do you offer Software as a Service with Public Cloud with a committed Quality of Service? Please elaborate? | Yes, we provide SaaS in 5 different DCs worldwide (AWS & Azure) |

## Security

*26 rows Ã— 2 columns*

| Item | Vendor Response |
| --- | --- |
| What are the security standards which the product adheres to (for example SAML Vx.x, SSL v3.0, TLS v1.0 etc.) | TLS1.3, TLS1.2 |
| What are the data encryptions provided by the API during the data transfer? Strong cryptography and security protocols must be used to safeguard the data during transmission over internal and public network.  | AES256 Encryption |
| Does the product support integration Allianz Turkey authentication mechanism (CAS)? | can be developed through professional services. |
| Does the prouct support integration with an external Identity Access Management system? | can be developed through professional services. |
| Does the product support Single Sign-on? | Yes |
| Does the product support Role Based Access segregations for business critical operations? | Yes |
| Does the product supports integration with Allianz Turkey Role / Profile system to dynamically fetch the role / profiles? | can be developed through professional services. |
| Does the product provides Audit Trail for each login operations? | Yes |
| Does the product provides Audit Trail for each business actions and modifications whether from Uis, or APIs or EOD? (Note: These audit trails must be available for users through the UI) | Partial |
| Does the application configuration and parameteres contain any clear text? Please note that Allianz Security Standards mandate zero clear text/ | We supprt data masking and tokenization of PII data |
| Does the product spport data masking for Non-Prod environments? | Yes |
| Are new user created with zero privilidges by default until the required privilidge or role assigned? | Yes |
| Does the product lock the user session after a configurable time elapse? | Yes |
| If LDAP/CAS authentication is not supported, does the product deactivate a user if not  logged in for a configurable time? | LDAP supported |
| Does the product prevent user login / session from multiple PCs at the same time? | No |
| If LDAP/CAS authentication is not supported, does the system lock the user after a configurable number of unsuccessful attempt? | LDAP supported |
| Are there any super users that is required to be owned by the vendor? Note: All user users has to be fully handed over to Alliaz Turkey admins. | No |
| Is there any Guest account in the system? Can it be disabled? | No guest accounts |
| Does the productt support 2-Factor Authentication | Yes |
| If LDAP/CAS authentication is not supported, does the application imposes a complex password mechanism? Please describe. E.g. Min 12 Chars, Min 1 Alpha, Min 1 Capital Letter, Min 1 Special Letter, No repitition, etc. | LDAP supported |
| If LDAP/CAS authentication is not supported,  does the application prevents password recycling - setting histroical passwords? | LDAP supported |
| If LDAP/CAS authentication is not supported, does the application force the user to reset the password when a configurable time passed? | LDAP supported |
| If LDAP/CAS authentication is not supported, does the application store the passwords in encrypted form | LDAP supported |
| If LDAP/CAS authentication is not supported, the application should be able to enfore user to reset his password after first login? | LDAP supported |
| Does the product require using random ports? | No |
| Does the product have any Security audit (vulnerability, penetration, etc.) cetificates from an independent accreditations? | Yes |

## Support

*11 rows Ã— 2 columns*

| Item | Vendor Response |
| --- | --- |
| How many support team is dedicated to provide support for the subject product? | L1-L2- L3 support teams provide required tech support services for the product |
| What is the average years of experience for your support team in the market? | 15+ years |
| What is the average years of experience for your support team in your company? | 3+ years |
| Where are the support team(s) geographically located? | Istanbul and Lahore |
| What are the support schedule and availability of the support team? E.g. Mon-Fri, 24/7, timezone, etc.? | We provide 7/24 or 5/8 support SLAs according to the contract terms |
| Does your support service conform to an SLA metrics? Please provide expected response time, workaround resolution time and permanent fix time fir Severity-1, Severity-2, Severity-3 and Severity-4 incidents. | Please refer to the SLA documentation attached. DÂ·engage SLA.pdf |
| Would you be able to commit for a penalty clause set forth in the agreement for  any event breaching SLA metrics?  | Yes, but the penalties are capped to a certain percentage of the total value of the signed contract. |
| Do you have ticket platform for recording and monitoring all tickets raised? | Yes |
| Do you provide any standard end user, technical and / or administrator training? Please specify if provided on a shceduled calendar or on demand basis. | Yes, during the onboarding process all training sessions are conducted. After that, on-demand training sessions can also be scheduled for a certain fee. |
| Are these trainings available online? | Yes, training sessions can be conducted online. |
| Do you have any local partners which can provide project management capability or provide Outsource Staff for any new requirements about the product enhancement? | No |

---

