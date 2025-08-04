# Aşama 1: React uygulamasını build etme
FROM node:18-alpine AS builder

WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package.json package-lock.json ./
# Bağımlılıkları yükle (npm kullanıyorsanız)
RUN npm install --frozen-lockfile 

# Uygulama kaynak kodunu kopyala
COPY . .

# React uygulamasını üretim için build et
RUN npm run build 

# Aşama 2: Nginx ile statik dosyaları servis etme
FROM nginx:alpine

# Nginx varsayılan yapılandırmasını sil
RUN rm /etc/nginx/conf.d/default.conf

# Özel Nginx yapılandırmasını kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build edilmiş React dosyalarını Nginx'in statik dosya dizinine kopyala
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx'in 80 portunda dinlemesini sağla
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]