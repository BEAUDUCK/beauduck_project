<<<<<<<< HEAD:back/beauduck-makeup/src/main/java/com/ssafy/beauduckmakeup/config/SwaggerConfiguration.java
package com.ssafy.beauduckmakeup.config;
========
package com.ssafy.beauducktogether.config;
>>>>>>>> 0af520b3f4c2beb015d8c2f7a8599fbedfbfe8af:back/beauduck-together/src/main/java/com/ssafy/beauducktogether/config/SwaggerConfiguration.java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
    private ApiInfo commonInfo() {
        return new ApiInfoBuilder()
<<<<<<<< HEAD:back/beauduck-makeup/src/main/java/com/ssafy/beauduckmakeup/config/SwaggerConfiguration.java
                .title("Board API")
========
                .title("Together API")
>>>>>>>> 0af520b3f4c2beb015d8c2f7a8599fbedfbfe8af:back/beauduck-together/src/main/java/com/ssafy/beauducktogether/config/SwaggerConfiguration.java
                //.description("")
                //.license("leeys")
                //.licenseUrl("http://leeys.tistory.com")
                .version("1.0")
                .build();
    }

    @Bean
    public Docket allApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("Together")
                .useDefaultResponseMessages(false)
                .select()
                //.apis(RequestHandlerSelectors.any())
<<<<<<<< HEAD:back/beauduck-makeup/src/main/java/com/ssafy/beauduckmakeup/config/SwaggerConfiguration.java
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.beauduckmakeup.controller"))
========
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.beauducktogether.controller"))
>>>>>>>> 0af520b3f4c2beb015d8c2f7a8599fbedfbfe8af:back/beauduck-together/src/main/java/com/ssafy/beauducktogether/config/SwaggerConfiguration.java
                .paths(PathSelectors.any())
                .build()
                .apiInfo(commonInfo());
    }
}