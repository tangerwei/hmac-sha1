package com.test;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class GetSign{

	public static void main(String[] args){
		//接口地址
		String baseURL = "http://api.hengqian.net/openApi/sessionKey/requestToken";
		//开放平台应用的apikey
		String consumer_key = ""; 
		//应用的secretKey
		String consumer_secret = ""; 
		//你的回调地址
		String callBackUrl = ""; 
		
		//时间戳
		Long test = System.currentTimeMillis();
		String time = test.toString().substring(0, 10);
		String url = "";
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("consumerKey", consumer_key);
		paramMap.put("callBackUrl", callBackUrl);
		paramMap.put("timeTamp",time);
		try {
			//构造访问地址
			url = getUrl(baseURL,paramMap,consumer_secret);
			System.out.println("请求地址====" + url );
		} catch (InvalidKeyException e1) {
			e1.printStackTrace();
		} catch (NoSuchAlgorithmException e1) {
			e1.printStackTrace();
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}catch(ParseException e1){
			e1.printStackTrace();
		}
		try {
			//请求获取临时令牌
			URL my_url = new URL(url);
			BufferedReader br = new BufferedReader(new InputStreamReader(
					my_url.openStream()));
			String strTemp = "";
			while (null != (strTemp = br.readLine())) {
				System.out.println("返回临时令牌=====" + strTemp);
			}
			
			//用临时令牌交换用户令牌
			URL url2 = new URL("http://api.hengqian.net/openApi/sessionKey/Authorize?token=" + strTemp);
			BufferedReader br2 = new BufferedReader(new InputStreamReader(
					url2.openStream()));
			String str = "";
			while (null != (str = br2.readLine())) {
				//System.out.println("返回=====" + str);
			}			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/*
	 * 拼接URL
	 */
	public static String getUrl(String baseUrl, Map map,
			String consumer_secret) throws InvalidKeyException,
			NoSuchAlgorithmException, UnsupportedEncodingException ,ParseException{
		StringBuffer term = new StringBuffer(baseUrl + "?");
		//获取sign
		String signature = getSignature(baseUrl,map, consumer_secret);
		System.out.println("生成签名密钥：=======" + encoderStr(signature));
		term.append("consumerKey=" + map.get("consumerKey") + "");
		term.append("&callBackUrl="+map.get("callBackUrl") + "");
		term.append("&timeTamp=" + map.get("timeTamp") + "");
		term.append("&sign=" + encoderStr(signature) + "");
		return term.toString();
	}

	// 生成密钥
	public static String getSignature(String baseUrl,Map map,
			String consumer_secret) {
		String signature = "";
		String base_string = initBaseString(baseUrl, map);
		String secret = encoderStr(consumer_secret);
		signature = new BASE64Encoder().encode(encodeHmacSHA(
				base_string.getBytes(), secret.getBytes()));
		return signature;
	}
	/*
	 * 依据传递的参数拼接baseString
	 */
	public static String initBaseString(String baseUrl, Map map) {
		StringBuffer baseString = new StringBuffer(encoderStr(baseUrl) + "&");
		String[] str=new String[map.size()];
		String[] keyArray = (String[]) map.keySet().toArray(str);
		Arrays.sort(keyArray);
		StringBuffer paramsStr = new StringBuffer();
		for(String key:keyArray){
			paramsStr.append(encoderStr(key) + "=").append(encoderStr(map.get(key).toString())+"&");
		}
		String para = paramsStr.toString();
		para=para.substring(0, para.length()-1);
		baseString.append(encoderStr(para));
		System.out.println("签名基串baseString=====" + baseString.toString());
		return baseString.toString();
	}


	/**
	 * 使用HmacSHA算法计算
	 * 
	 * @param data
	 *            字符基串
	 * @param key
	 *            密钥
	 * @return 加密后的签名（长度为16的字节数组）
	 */
	public static byte[] encodeHmacSHA(byte[] data, byte[] key) {
		String method = "HmacSHA1";
		Key k = new SecretKeySpec(key, method);
		Mac mac = null;
		try {
			mac = Mac.getInstance(method);
			mac.init(k);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		}

		return mac.doFinal(data);
	}
	/**
	 *  URL转码
	 * **/
	public static String encoderStr(String str) {
		String result = "";
		try {
			result = URLEncoder.encode(str, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return result;
	}

}
