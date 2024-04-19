# 读取data.txt文件
with open('data.txt', 'r', encoding='utf-8') as file:
    lines = file.readlines()

# 格式转换
converted_lines = []
for line in lines:
    # 去除花括号和空格
    line = line.strip('{} ').strip(',')
    parts = line.split(',')
    name = parts[0].split(':')[1].strip().strip("'")
    value = parts[1].split(':')[1].strip().strip('}')
    converted_lines.append(f"('{name}', {value}, 2022),")

# 将转换后的内容写入convert.txt文件
with open('convert.txt', 'w', encoding='utf-8') as file:
    file.write('\n'.join(converted_lines))
