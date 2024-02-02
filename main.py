import requests

payload = {
    "prompt": "# write a fizz buzz function in python\n\n",
    "language": "python"
}

prompt = payload["prompt"]

code = []

while True:
    response = requests.post("http://localhost:8080/api", json=payload)
   
    if "#" in response.text:
        break
    
    
    payload["prompt"] += f"{response.text.replace("\n", "")}\n"
    
    print(repr(payload["prompt"]))
    text = payload["prompt"]    
        

print(payload["prompt"])
    
    



