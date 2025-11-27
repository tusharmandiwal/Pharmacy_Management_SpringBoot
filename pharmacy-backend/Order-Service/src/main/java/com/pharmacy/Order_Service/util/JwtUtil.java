package com.pharmacy.Order_Service.util;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    private static final String SECRET = "your-very-long-base64-encoded-secret-key-for-hs384"; 
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());


    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractName(String token) {
        try {
            return extractAllClaims(token).get("name", String.class);
        } catch (Exception e) {
            System.out.println("Error extracting name: " + e.getMessage());
            return null;
        }
    }

    public String extractPhone(String token) {
        return extractAllClaims(token).get("phone", String.class);
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		Claims claims = Jwts.parserBuilder()
				.setSigningKey(SECRET_KEY)
				.build()
				.parseClaimsJws(token)
				.getBody();
		return claimsResolver.apply(claims);
	}

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public boolean validateToken(String token, String email) {
        final String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(email) && !isTokenExpired(token));
    }


	private boolean isTokenExpired(String token) {
		return extractClaim(token, Claims::getExpiration).before(new Date());
	}
}
