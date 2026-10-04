lines = []
with open(r'e:\SourceCode\so_tay_on_tap\user_data\261004_2_toan.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start = -1
end = -1
for i, line in enumerate(lines):
    if line.startswith('```javascript'):
        start = i + 1
        break
if start != -1:
    for i in range(start, len(lines)):
        if line.startswith('```') or lines[i].startswith('---'):
            end = i
            break

if start != -1 and end != -1:
    with open(r'e:\SourceCode\so_tay_on_tap\src\data\subjects\toan7.js', 'w', encoding='utf-8') as out:
        out.writelines(lines[start:end])
    print("Success")
else:
    print(f"Failed: start={start}, end={end}")
