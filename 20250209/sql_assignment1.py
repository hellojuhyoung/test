import random
import csv

def generate_korean_name():
    # Using the 'names' library, which can generate names from various cultures.
    # While it won't be perfectly authentic, it will give plausible-looking names.
    korean_names = ["김민준", "박서준", "이현우", "정지현", "강동원", "송지효", "유재석", "지창욱", "현빈", "손예진",  # Add more names
                "김수현", "이민호", "박보검", "송중기", "공유", "전지현", "아이유", "수지", "윤아", "태연"]
    return random.choice(korean_names)# You can customize the name generation if needed.

def generate_korean_phone_number():
    prefix = "010"
    mid = str(random.randint(1000, 9999))
    last = str(random.randint(1000, 9999))
    return f"{prefix}-{mid}-{last}"

def generate_korean_address():
    gu_data = {
        "Seoul": {
            "Gangnam-gu": ["Teheran-ro", "Gangnam-daero", "Apgujeong-ro"],
            "Seocho-gu": ["Seocho-daero", "Bangbaejungang-ro", "Yangjaecheon-ro"],
            "Yongsan-gu": ["Yongsan-daero", "Itaewon-ro", "Hannam-daero"],
            "Songpa-gu": ["Songpa-daero", "Olympic-ro", "Baekjegobun-ro"],
            "Gangdong-gu": ["Cheonho-daero", "Yangjae-daero", "Dongnam-ro"],
            "Guro-gu": ["Gurojungang-ro", "Gyeongin-ro", "Gasan Digital 1-ro"],
            "Gwanak-gu": ["Gwanak-ro", "Nambu-sunhwan-ro", "Sillim-ro"],
            "Dongjak-gu": ["Sadaemyeongsu-ro", "Yeouidaebang-ro", "Heukseok-ro"],
            "Yeongdeungpo-gu": ["Yeongdeungpo-daero", "Gukhoe-daero", "Yeouido-ro"],
            "Mapo-gu": ["Mapo-daero", "Yanghwa-ro", "World Cup-ro"],
            "Seodaemun-gu": ["Seodaemun-ro", "Chungjeong-ro", "Sinchon-ro"],
            "Jongno-gu": ["Jongno", "Saejong-daero", "Euljiro"],
            "Jung-gu": ["Euljiro", "Toegye-ro", "Myeongdong-gil"],
            "Seongdong-gu": ["Seongdong-daero", "Wangsimni-ro", "Ttukseom-ro"],
            "Gwangjin-gu": ["Gwangjin-ro", "Achasan-ro", "Jayangbeonji-ro"],
            "Dongdaemun-gu": ["Cheonggyecheon-ro", "Wangsan-ro", "Junghwa-ro"],
            "Jungrang-gu": ["Jungnang-ro", "Manguri-ro", "Sinnae-ro"],
            "Seongbuk-gu": ["Seongbuk-ro", "Bomun-ro", "Anam-ro"],
            "Nowon-gu": ["Nowon-ro", "Hagye-ro", "Gongneung-ro"],
            "Dobong-gu": ["Dobong-ro", "Banghak-ro", "Changdong-ro"],
            "Eunpyeong-gu": ["Eunpyeong-ro", "Susaek-ro", "Bulgwang-ro"],
            "Seo-gu": ["Seo-ro", "Gyeongin-ro", "Wonhyo-ro"],
            "Gangbuk-gu": ["Gangbuk-ro", "Mia-ro", "Suyu-ro"]
        },
        "Busan": {
            "Gangseo-gu": ["Noksan-ro", "Cheoyong-ro", "Gadeokhaean-ro"],
            "Sasang-gu": ["Sasang-ro", "Gaya-daero", "Hakjang-ro"],
            "Busanjin-gu": ["Busanjin-ro", "Jungang-daero", "Dongseong-ro"],
            "Dongnae-gu": ["Dongnae-ro", "Oncheoncheon-ro", "Myeongnyun-ro"],
            "Yeonsan-gu": ["Yeonsan-ro", "Geoje-ro", "Suyeong-ro"],
            "Suyeong-gu": ["Suyeong-ro", "Gwanganhaebyeon-ro", "Millak-ro"],
            "Haeundae-gu": ["Haeundaehaebyeon-ro", "Jungdong-ro", "U-dong-ro"],
            "Nam-gu": ["Nam-gu-ro", "Daeyeon-ro", "Sinseon-ro"],
            "Buk-gu": ["Buk-gu-ro", "Gupo-ro", "Hwamyeong-daero"],
            "Geumjeong-gu": ["Geumjeong-ro", "Busandaehak-ro", "Cheongnyong-ro"],
            "Dong-gu": ["Dong-gu-ro", "Jungang-daero", "Choryang-ro"],
            "Seo-gu": ["Seo-gu-ro", "Amtae-ro", "Songdo-ro"],
            "Yeonje-gu": ["Yeonje-ro", "Yangjeong-ro", "Geojenae-ro"]

        },
        "Daegu": {
            "Jung-gu": ["Dongseong-ro", "Jungang-ro", "Gukchae-bosang-ro"],
            "Dong-gu": ["Dongdaegu-ro", "Sincheon-daero", "Hyomok-ro"],
            "Seo-gu": ["Seodaegu-ro", "Pyeongni-ro", "Jungni-ro"],
            "Nam-gu": ["Namgu-ro", "Daemyeong-ro", "Hyunpung-ro"],
            "Buk-gu": ["Bukgu-ro", "Hoguk-ro", "Daebul-ro"],
            "Dalseo-gu": ["Dalseo-daero", "Sangsang-ro", "Wolbae-ro"],
            "Suseong-gu": ["Suseong-ro", "Dong-a-ro", "Beommul-ro"],
            "Dalseong-gun": ["Dalseong-gun-ro", "Hwawon-ro", "Okpo-ro"]
        },
    }
    city = random.choice(list(gu_data.keys()))  # Randomly choose a city
    gu = random.choice(list(gu_data[city].keys())) # Randomly choose a Gu/District within that city
    road = random.choice(gu_data[city][gu]) # Randomly choose a road within that Gu/District
    number = random.randint(1, 999) # Random number

    return f"{city} {gu} {road} {number}"

def generate_email(name):
    # Generates a simple, plausible email.
    name_parts = name.split()
    if len(name_parts) > 1:
        first_name = name_parts[0].lower()
        last_name = name_parts[1].lower()
        return f"{first_name}.{last_name}{random.randint(1, 100)}@example.com"
    else:
        return f"{name.lower()}{random.randint(1, 100)}@example.com"


for _ in range(50):
    name = generate_korean_name()
    phone = generate_korean_phone_number()
    address = generate_korean_address()
    email = generate_email(name)

# 
#
#
def generate_sql_insert_statements(num_records):
    sql_statements = []
    for _ in range(num_records):
        name = generate_korean_name()
        phone = generate_korean_phone_number()
        address = generate_korean_address()
        email = generate_email(name)

        # Escape single quotes in the values (important for SQL)
        name = name.replace("'", "''")  # Escape single quotes for SQL
        address = address.replace("'", "''") # Escape single quotes for SQL
        email = email.replace("'", "''") # Escape single quotes for SQL


        sql = f"INSERT INTO korean_data (name, phone, address, email) VALUES ('{name}', '{phone}', '{address}', '{email}');"
        sql_statements.append(sql)
    return sql_statements

def write_to_sql_file(sql_statements, filename="korean_data.sql"):
    with open(filename, 'w', encoding='utf-8') as sqlfile:
        for statement in sql_statements:
            sqlfile.write(statement + "\n")

if __name__ == "__main__":
    num_records = 50
    sql_statements = generate_sql_insert_statements(num_records)
    write_to_sql_file(sql_statements)

# def generate_data(num_records):
#     data = []
#     for _ in range(num_records):
#         name = generate_korean_name()
#         phone = generate_korean_phone_number()
#         address = generate_korean_address()
#         email = generate_email(name)
#         data.append([name, phone, address, email])
#     return data

# def write_to_csv(data, filename="korean_data.csv"):
#     with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
#         writer = csv.writer(csvfile)
#         writer.writerow(["Name", "Phone", "Address", "Email"])  # Header row
#         writer.writerows(data)

# if __name__ == "__main__":
#     num_records = 50
#     data = generate_data(num_records)
#     write_to_csv(data)
