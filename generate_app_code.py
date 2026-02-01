levels = [
    ("Expert", "expert"),
    ("Senior", "senior"),
    ("Expert5", "expert5"),
    ("Master", "master")
]
imports = []
routes = []
for class_prefix, path_prefix in levels:
    for i in range(1, 17):
        class_name = f"{class_prefix}Lesson{i}"
        path = f"/{path_prefix}-lesson{i}"
        imports.append("import {0} from './lessons/{0}';".format(class_name))
        routes.append('        <Route path="{0}" element={<{1} />} />'.format(path, class_name))
with open("app_code.txt", "w") as f:
    f.write("\n".join(imports) + "\n---\n" + "\n".join(routes))
