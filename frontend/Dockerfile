		# Step 1: build 파일 옮기기
		FROM node:18 as build-stage
		WORKDIR /app
		COPY ./build .
		
		# Step 2: Nginx이미지에 build파일 넣기
		FROM nginx
				
		# Copy the built React application from the build-stage
		COPY --from=build-stage app /usr/share/nginx/html
        COPY default.conf /etc/nginx/conf.d/default.conf
		EXPOSE 80
		CMD ["nginx", "-g", "daemon off;"]