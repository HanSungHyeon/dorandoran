from gradio_client import Client

from customLog import LogInfo

rvc_address = "http://172.19.0.2:7865"
# rvc_address = "http://173.199.124.118:7865/"

def trainStartAll(user, gender, trainPath):
    client = Client(rvc_address)
    LogInfo("111111111111111111")
    result = client.predict(
                    f"{user}_{gender}",	
                    "40k",	
                    "true",	
                    trainPath,	
                    0,	
                    4,	
                    "rmvpe_gpu",	
                    40,	# 저장 주기
                    200, # 에포크 수
                    12,	# gpu 배치 크기
                    "true", # 하드디스크 공간 절약	
                    "assets/pretrained_v2/f0G40k.pth",	
                    "assets/pretrained_v2/f0D40k.pth",	
                    "0",	
                    "false" 
                    "false",
                    "v2",
                    "0-0",
                    api_name="/train_start_all"
    )
    LogInfo("222222222222222222")
    LogInfo(result)