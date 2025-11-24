import subprocess

r=subprocess.run("python","summarysend.py")

if r.returncode==0:
    subprocess.run("python","request_routes")