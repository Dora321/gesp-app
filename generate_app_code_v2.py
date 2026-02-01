mapping = [
    ("l1", "CppL1Lesson"),
    ("l2", "CppL2Lesson"),
    ("l3", "CppL3Lesson"),
    ("l4", "CppL4Lesson"),
    ("l5", "CppL5Lesson"),
    ("l6", "CppL6Lesson")
]

path_mapping = [
    ("l1", ""),
    ("l2", "adv-"),
    ("l3", "expert-"),
    ("l4", "senior-"),
    ("l5", "expert5-"),
    ("l6", "master-")
]

imports = []
routes = []

for level_dir, comp_prefix in mapping:
    path_prefix = [p[1] for p in path_mapping if p[0] == level_dir][0]
    imports.append("// {0}".format(level_dir.upper()))
    routes.append("        {/* {0} */}".format(level_dir.upper()))
    for i in range(1, 17):
        comp_name = "{0}{1}".format(comp_prefix, i)
        file_path = "./lessons/cpp/{0}/Lesson{1}".format(level_dir, i)
        route_path = "/{0}lesson{1}".format(path_prefix, i)
        
        imports.append("import {0} from '{1}';".format(comp_name, file_path))
        routes.append('        <Route path="{0}" element={<{1} />} />'.format(route_path, comp_name))

with open("app_code_v2.txt", "w") as f:
    f.write("\n".join(imports) + "\n---\n" + "\n".join(routes))
