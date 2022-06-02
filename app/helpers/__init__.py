
import datetime
today_not_coverted = datetime.date.today() # gives date as 2022-06-02
todayArr = f"{today_not_coverted}".split('-')

today_list = []

for today in todayArr:
    date = int(today)
    today_list.append(date)
print(today_list) #shows an array as [2022, 6, 2] for today


def dates_converter(date_string):

    date_list_str = date_string.split(",")
    date_list = []
    for date in date_list_str:
        created_date = int(date)
        date_list.append(created_date)
    return calculator(date_list, today_list)


def calculator(post, today_list):
    yrs_since = today_list[0] - post[0] #
    months_since = today_list[1] - post[1] #
    days_since = today_list[2] - post[2] #
    if yrs_since > 1: return f"{yrs_since} years ago"
    if yrs_since == 1: return f"{yrs_since} year ago"
    if months_since > 1: return f"{months_since} months ago"
    if months_since == 1: return f"{months_since} month ago"
    if days_since > 1: return f"{days_since} days ago"
    if days_since == 1: return f"{days_since} day ago"
    return 'today'







































def post_e():
    print('I have the best team to work with! <3 you guys :D - Nessie')
